import unittest
import base64
from detect_face import lambda_handler


class TestLambdaHandler(unittest.TestCase):

    def setUp(self):
        self.IMAGE_DIRECTORY = "./test_images/"

    def getResponse(self, filename):
        with open(self.IMAGE_DIRECTORY + filename, "rb") as f:
            img_binary = f.read()

            event = {"body": base64.b64encode(img_binary)}
            response = lambda_handler(event, {})
            return response

    # 顔があると200が返ってくる
    def test_face(self):
        filename = "two_faces.jpg"
        response = self.getResponse(filename)
        self.assertEqual(200, response["statusCode"])

    # 顔がないと204が返ってくる
    def test_no_face(self):
        filename = "cat.jpg"
        response = self.getResponse(filename)
        self.assertEqual(204, response["statusCode"])

    # 画像以外のファイルを拡張子を偽ってアップロードしてもダメ
    def test_not_image(self):
        filename = "not_image.txt.jpg"
        response = self.getResponse(filename)
        self.assertEqual(400, response["statusCode"])


if __name__ == "__main__":
    unittest.main()
