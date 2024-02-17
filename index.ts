// index.ts
import { App } from '@slack/bolt';

// Slack Appの設定情報
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const TIMES_ALL_CHANNEL_ID = process.env.TIMES_ALL_CHANNEL_ID // `times-all` チャンネルのIDを設定
if(!TIMES_ALL_CHANNEL_ID) throw new Error("times-all channel is undefined");
const WORKSPACE_URL = 'https://your-workspace.slack.com'; // SlackワークスペースのURLを設定
if(!WORKSPACE_URL) throw new Error("workspace is undefined");

// 'time-'プレフィックスがついたチャンネルのメッセージを検出
app.message(async ({ message, client }) => {
  // メッセージがチャンネルからのものかどうか確認
  if ('channel' in message && message.channel_type === 'channel'  && message.channel !== TIMES_ALL_CHANNEL_ID) {
    // チャンネルの情報を取得
    const channelInfo = await client.conversations.info({
      channel: message.channel
    });

    // チャンネル名が'time-'で始まる場合、メッセージを'times-all'に転載
    if (channelInfo.channel?.name?.startsWith('time-')) {
    const messageTimestamp = message.ts.replace('.', '');
      const messageLink = `${WORKSPACE_URL}/archives/${message.channel}/p${messageTimestamp}`;
      await client.chat.postMessage({
        channel: TIMES_ALL_CHANNEL_ID,
        text: `<${messageLink}|このメッセージ> が <#${message.channel}> で投稿されました。`
      });
    }
  }
});

// アプリの起動
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
