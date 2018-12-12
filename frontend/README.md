# [えもじっく](https://emojic.ch) フロントエンド

## Summary
Nuxt.jsで作られた[えもじっく](https://emojic.ch)のフロントエンドのソースです。
## Start Project
1. `env.development.js`を開き、APIエンドポイントの設定をします。

```javascirpt
module.exports = {
  endpoint: process.env.EMOJIC_DEV_ENDPOINT
}

```

2. 起動
``` bash
yarn install
yarn run dev
```

## Generate Deploy files
1. `env.production.js`を開き、本番環境用のAPIエンドポイントを設定します。

```javascript

module.exports = {
  endpoint: 'https://emojic.ch/upload'
}
```

2. 静的ファイルを書き出す。

```bash
yarn run generate
```

## How to deploy
事前に`aws cli`の設定が必要です。

また、S3、Cloudfrontの作成が終わっているものとします。
```bash
export EMOJIC_BUCKET=[S3 BUCKET NAME]
export EMOJIC_DISTRIBUTION=[CLOUDFRONT DISTRIBUTION ID]
yarn run generate
./deploy_to_s3.sh
```