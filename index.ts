// index.ts
import dotenv from "dotenv";
dotenv.config();
import { App, AwsLambdaReceiver } from "@slack/bolt";
import { Handler } from "aws-lambda";

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
if (!SLACK_SIGNING_SECRET) throw new Error("signing secret is undefined");

// AWS Lambdaのレシーバーを作成
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
});

// Slack Appの設定情報
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

const TIMES_ALL_CHANNEL_ID = process.env.TIMES_ALL_CHANNEL_ID; // `times-all` チャンネルのIDを設定
if (!TIMES_ALL_CHANNEL_ID) throw new Error("times-all channel is undefined");
const WORKSPACE_URL = process.env.WORKSPACE_URL; // SlackワークスペースのURLを設定
if (!WORKSPACE_URL) throw new Error("workspace is undefined");

// 'times-'プレフィックスがついたチャンネルのメッセージを検出
app.message(async ({ message, client }) => {
  console.log("received message");
  // メッセージがチャンネルからのものかどうか確認
  if (
    "channel" in message &&
    message.channel_type === "channel" &&
    message.channel !== TIMES_ALL_CHANNEL_ID
  ) {
    console.log("time-all以外のチャンネル");
    // チャンネルの情報を取得
    const channelInfo = await client.conversations.info({
      channel: message.channel,
    });
    console.log("channelInfo:", channelInfo);
    // チャンネル名が'times-'で始まる場合、メッセージを'times-all'に転載
    if (channelInfo.channel?.name?.startsWith("times-")) {
      console.log("channel name starts with times-");
      if (!(message.subtype === undefined)) {
        return;
      } //subtypeがある場合は無視
      const messageTimestamp = message.ts.replace(".", "");
      const messageLink = `${WORKSPACE_URL}/archives/${message.channel}/p${messageTimestamp}`;
      console.log("messageLink:", messageLink);
      await client.chat.postMessage({
        channel: TIMES_ALL_CHANNEL_ID,
        text: `<${messageLink}|このメッセージ> が <#${message.channel}> で投稿されました。`,
      });
    } else {
      console.log(channelInfo.channel?.name);
    }
  }
});

app.event("channel_created", async ({ event, client, logger }) => {
  if (event.channel.name?.startsWith("times-")) {
    logger.debug(event.channel.name);
    await client.conversations.join({ channel: event.channel.id });
    logger.info(`Joined channel: ${event.channel.name}`);
  }
});

// Lambdaのイベント処理
export const handler: Handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
