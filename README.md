# [えもじっく](https://emojic.ch)

![トップページ](./docs/top_image_pc.png)

## Summray
[えもじっく](https://emojic.ch)は写真から顔を判定して、絵文字スタンプを貼り付けてくれるWebサービスです。

[https://emojic.ch](https://emojic.ch)

## Architecture

![アーキテクチャ図](./docs/emojic_architecture.png)

- [えもじっく](https://emojic.ch)のフロントエンドはNuxt.jsで構築されています。CircleCIでmasterブランチにマージされるたびにデプロイされます。
- バックエンドAPIはAamazon API GatewayとAWS LambdaをServerless Frameworkを使って構築しています。
- Lambda関数はPythonで書かれており、Amazon Rekognitionを使って顔認識を行っています。

## 紹介記事
[人の顔を絵文字😇に変換するWebサービスをAmazon Rekognition x Serverlessで開発して、デプロイをCIで自動化した話](https://qiita.com/wagase/items/fa0215cee44251bf2e50)

## Front-end
[こちら](./frontend/README.md)のREADMEをご覧ください。

## AWS Lambda
[こちら](./lambda/README.md)のREADMEをご覧ください。
## LICENSE
MIT