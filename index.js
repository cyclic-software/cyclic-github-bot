require('dotenv').config()

const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

module.exports = (app) => {
  app.log.info("App was loaded");

  app.on("issues.opened", async (context) => {

    console.log(JSON.stringify(context, null, 2))

    await webhook.send({
        text: `Issue opened: ${context.payload.issue.html_url}`,
    });

    const issueComment = context.issue({
      body: "Thanks for opening this issue. It has been logged in our internal slack.",
    });
    return context.octokit.issues.createComment(issueComment);
  });
};
