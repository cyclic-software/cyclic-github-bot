require('dotenv').config()

const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

module.exports = (app) => {
  app.log.info("App was loaded");

  app.on("issues.closed", async (context) => {

    console.log(JSON.stringify(context, null, 2))

    await webhook.send({
        text: `Issue closed: ${context.payload.issue.html_url}`,
    });

    const issueComment = context.issue({
      body: "Thanks for closing this issue. Please come again!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
};
