import cv2
import numpy as np
import io
from PIL import Image
import base64
import json
import random
import os
import sys
from typing import List

"""
binary : 画像のバイナリデータ
返り値 : RGBの画像の配列データ
参考 : https://qiita.com/rrryutaro/items/ce6634a37a257adc4fb1
参考 : https://qiita.com/wasnot/items/be649f289073fb96513b
"""


def convertBinaryToImage(binary: bytes) -> np.ndarray:
    # 一旦Pillow用の画像データにする
    pil_image = Image.open(io.BytesIO(binary))

    # PIL.JpegImagePlugin.JpegImageFile -> numpy.ndarray(RGB)に変換
    image_array = np.asarray(pil_image)

    return image_array


"""
image : 顔認識を行いたい画像
min_face_size_ratio : 顔の最小検出サイズを画像の縦横短い方に対する比率で指定する。 0.0 ~ 1.0
返り値 : 顔認識結果の入った配列
"""


def detectFaces(image: np.ndarray,
                min_face_size_ratio: float) -> List[List[int]]:

    height, width, _ = image.shape[:3]

    # 顔の最小検出サイズ
    min_face_size = int(min(height, width) * min_face_size_ratio)

    # グレースケール変換
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 顔認識を実行
    cascade_path = "./cv2/data/haarcascade_frontalface_default.xml"
    cascade = cv2.CascadeClassifier(cascade_path)
    faces = cascade.detectMultiScale(
        image_gray,
        scaleFactor=1.1,
        minNeighbors=2,
        minSize=(min_face_size, min_face_size))

    return faces


"""
image : 画像配列。RGB
face : 顔認識結果
返り値 : 絵文字を合成した画像
"""


def pasteEmoji(image: np.ndarray, face: List[int]) -> np.ndarray:

    # -1 : アルファチャンネルで読み込む
    emoji = cv2.imread(
        "emoji/{:0=3}.png".format(random.randrange(1, 71, 1)), -1)

    # BGRA -> RGBAに変換
    emoji = cv2.cvtColor(emoji, cv2.COLOR_BGRA2RGBA)

    # 絵文字の画像サイズを顔の大きさに揃える
    resized_emoji = cv2.resize(
        emoji, (face[2], face[3]))

    # 透過処理
    # https://blanktar.jp/blog/2015/02/python-opencv-overlay.html
    mask = resized_emoji[:, :, 3]
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    mask = mask / 255.0

    # 予め型キャストしておく
    image = image.astype("float64")

    # 顔に画像を貼り付け
    image[face[1]:face[1] + face[2], face[0]:face[0] + face[3]] *= 1 - mask
    image[face[1]:face[1] + face[2], face[0]:face[0] +
          face[3]] += mask * resized_emoji[:, :, 0:3]

    return image


"""
プロキシ統合に関するdocs : https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
"""


def lambda_handler(event, context):
    try:
        binary_image = base64.b64decode(event["body"])
        image = convertBinaryToImage(binary_image)
        faces = detectFaces(image, 0.12)

        for face in faces:
            image = pasteEmoji(image, face)

        # レスポンス用のバイナリイメージを作成
        # 参考 : https://stackoverrun.com/ja/q/7582988
        response_image = io.BytesIO()
        Image.fromarray(image.astype('uint8')).save(
            response_image, "JPEG")

        # レスポンスを作成
        body = base64.b64encode(response_image.getvalue()).decode('utf-8')

        status = 200

        # 204で顔が検出されなかったことを表現
        if len(faces) == 0:
            status = 204

        response = {
            "statusCode": status,
            "headers": {
                "Content-Type": "image/jpeg",
                "Access-Control-Allow-Origin": os.environ["EMOJIC_ORIGIN"]
            },
            "body": body,
            "isBase64Encoded": True
        }

        print(response)
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


def test(input_file):

    with open(input_file, "rb") as f:
        img_binary = f.read()

        event = {"body": base64.b64encode(img_binary)}
        response = lambda_handler(event, {})

        # 出力確認用
        test = base64.b64decode(response["body"])
        with open("output.jpg", "wb") as f:
            f.write(test)

        print("Success!")
        print(response)


if __name__ == "__main__":
    test(sys.argv[1])
