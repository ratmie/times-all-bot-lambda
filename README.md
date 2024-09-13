# time-all-bot
repost times-* channel to "time-all"

元リポジトリは
https://github.com/ratmie/time-all-bot

## setting

.envファイルを作成する
```
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET= 
TIMES_ALL_CHANNEL_ID=
WORKSPACE_URL=
```
## awsの設定

awsの設定を以下などでしておくこと
```
$ aws configure
```

## local起動

```sh
$ npx tsc // buildする
$ npm run local
```

## deploy
```sh
$ AWS_PROFILE=foo npx serverless deploy 
```

## 資料

boltのドキュメント
https://slack.dev/bolt-js/ja-jp/deployments/aws-lambda

