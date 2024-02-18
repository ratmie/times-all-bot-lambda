# time-all-bot
repost times-* channel to "time-all"

元リポジトリは
https://github.com/ratmie/time-all-bot

## setting

```
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET= 
TIMES_ALL_CHANNEL_ID=
WORKSPACE_URL=
PORT=
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


## 資料

boltのドキュメント
https://slack.dev/bolt-js/ja-jp/deployments/aws-lambda

