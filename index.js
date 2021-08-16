require('dotenv').config()

// Init the slack webhook
const { IncomingWebhook } = require('@slack/webhook');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

/**
 * This is the main entrypoint for the Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("App was loaded");

  app.on("issues.opened", async (context) => {

    console.log(JSON.stringify(context, null, 2))

    // Send the notification
    (async () => {
      await webhook.send({
        text: 'An issue has been opened.',
      });
    })();

    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
