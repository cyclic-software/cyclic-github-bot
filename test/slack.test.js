
// require('dotenv').config({ path: '../.env' })
require('dotenv').config()

const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;



describe("Slack Webhooks", () => {

  test("send a message", async () => {
    const webhook = new IncomingWebhook(url);

    // Send the notification
    var res = await webhook.send({
      text: 'Sending from slack test',
      other: 'some other field'
    });

    console.log(JSON.stringify(res, null, 2))

    expect(true).toBe(true);
  });
});
