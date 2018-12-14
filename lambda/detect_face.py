import cv2
import numpy as np
import io
from PIL import Image
import base64
import json
import random
import os
import sys
import boto3
from typing import List

"""
binary : 画像のバイナリデータ
返り値 : RGBの画像の配列データ
参考 : https://qiita.com/rrryutaro/items/ce6634a37a257adc4fb1
参考 : https://qiita.com/wasnot/items/be649f289073fb96513b
"""


def convertBinaryToImageArray(binary: bytes) -> np.ndarray:
    # 一旦Pillow用の画像データにする
    pil_image = Image.open(io.BytesIO(binary))

    # PIL.JpegImagePlugin.JpegImageFile -> numpy.ndarray(RGB)に変換
    image_array = np.asarray(pil_image)

    return image_array


def detectFacesByRekognition(image_binary: bytes) -> List[List[float]]:
    client = boto3.client('rekognition')
    response = client.detect_faces(
        Image={'Bytes': image_binary}, Attributes=['ALL'])

    faces = list()
    for face_info in response["FaceDetails"]:
        faces.append(face_info["BoundingBox"])
        print(face_info["BoundingBox"])

    return faces


"""
image : 画像配列。RGB
face : 顔認識結果
返り値 : 絵文字を合成した画像
"""


def pasteEmoji(image: np.ndarray, face: List[float]) -> np.ndarray:

    height, width, _ = image.shape[:3]

    face_top = round(height * face["Top"])
    face_left = round(width * face["Left"])
    face_height = round(height * face["Height"])
    face_width = round(height * face["Width"])

    # 顔の枠を正方形にする
    face_size = round(max(face_height, face_width))

    # 絵文字が顔の真ん中にくるように座標を調整
    if face_height > face_width:
        face_left -= round((face_size - face_width)/2)
    elif face_width > face_height:
        face_top -= round((face_size - face_height)/2)

    # 顔が画像からはみ出しそうなときはサイズを小さくする
    if face_top + face_size > height or face_left + face_size > width:
        face_size = min(height - face_top, width - face_left)

    # -1 : アルファチャンネルで読み込む
    emoji = cv2.imread(
        "emoji/{:0=3}.png".format(random.randrange(1, 71, 1)), -1)

    # BGRA -> RGBAに変換
    emoji = cv2.cvtColor(emoji, cv2.COLOR_BGRA2RGBA)

    # 絵文字の画像サイズを顔の大きさに揃える
    resized_emoji = cv2.resize(
        emoji, (face_size, face_size))

    # 透過処理
    # https://blanktar.jp/blog/2015/02/python-opencv-overlay.html
    mask = resized_emoji[:, :, 3]
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    mask = mask / 255.0

    # 予め型キャストしておく
    image = image.astype("float64")

    # 顔に画像を貼り付け
    image[face_top:face_top + face_size,
          face_left:face_left + face_size] *= 1 - mask

    image[face_top:face_top + face_size,
          face_left:face_left + face_size] += mask * resized_emoji[:, :, 0:3]

    return image


"""
プロキシ統合に関するdocs : https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
"""


def lambda_handler(event, context):
    try:
        binary_image = base64.b64decode(event["body"])
        faces = detectFacesByRekognition(binary_image)
        image = convertBinaryToImageArray(binary_image)

        for face in faces:
            image = pasteEmoji(image, face)

        # レスポンス用のバイナリイメージを作成
        # 参考 : https://stackoverrun.com/ja/q/7582988
        response_image = io.BytesIO()
        Image.fromarray(image.astype('uint8')).save(
            response_image, "JPEG")
        body = base64.b64encode(response_image.getvalue()).decode('utf-8')

        # 204で顔が検出されなかったことを表現
        statusCode = 200
        if len(faces) == 0:
            statusCode = 204

        response = {
            "statusCode": statusCode,
            "headers": {
                "Content-Type": "image/jpeg",
                "Access-Control-Allow-Origin": os.environ["EMOJIC_ORIGIN"]
            },
            "body": body,
            "isBase64Encoded": True
        }
        log = {"face_count": len(faces)}
        print(str(log))
        return response

    except Exception as e:
        print(e)
        response = {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": os.environ["EMOJIC_ORIGIN"]
            },
            "body": json.dumps({
                "error": "can't return image."
            })
        }

        print("Error has occured.")
        print(response)

        return response


def outputImageFromFile(input_filename):

    with open(input_filename, "rb") as f:
        img_binary = f.read()

        event = {"body": base64.b64encode(img_binary)}
        response = lambda_handler(event, {})

        # 出力確認用
        test = base64.b64decode(response["body"])
        with open("output.jpg", "wb") as f:
            f.write(test)

        print(response["statusCode"])


if __name__ == "__main__":
    outputImageFromFile(sys.argv[1])
