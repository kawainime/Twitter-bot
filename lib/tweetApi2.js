const { twitterClient } = require("./twitterClient.js")

const sendTweet = async (content) => {
  try {
    await twitterClient.v2.tweet(content)
  } catch (e) {
    console.log("Failed to send tweet.", e)
  }
}

module.exports = {
  sendTweet,
}
