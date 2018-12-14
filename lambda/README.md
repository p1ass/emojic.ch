# えもじっく Lambda

## Summary
OpenCVを使って画像から顔認識を行い、😇に変換するスクリプトです。

## Requirements
```bash
pip install -r requrirements.txt
```

## Test
AWS Recognitionへのアクセスを許可されたAPIキー等を環境変数に設定します。

```bash
export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxx    
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxx
export AWS_DEFAULT_REGION=ap-northeast-1 
```
```bash
python test.py
```

## Convert mage from local file
```bash
python detect_face.py [INPUT_IMAGE_PATH]
```

変換後のファイルが`output.jpg`として出力されます。

## How to deploy
1. Serverless Frameworkを使ってデプロイを行います。

```
npm install -g serverless
npm install --save serverless-python-requirements serverless-prune-plugin
serverless deploy -v
```

2. curlからテスト
```bash
curl -v --request POST -H "Accept: image/jpeg" -H "Content-Type: image/jpeg" --data-binary "@input.jpg" [API_GATEWAY_ENDPOINT] > output.jpg

```