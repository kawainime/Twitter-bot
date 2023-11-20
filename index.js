require("dotenv").config({ path: __dirname + "/.env" })
const fs = require("fs")
const { sendTweet } = require("./lib/tweetApi2")

/**
 * Twitter API free tier is limited to posting tweets only without read permission. They ask for $42k for full API access.
 *
 * The function reads a JSON file containing a list of questions, sends a tweet with the current
 * question, updates the index of the current question, and writes the updated list back to the JSON
 * file.
 * If there are no more questions, it resets the index to 0 and
 * starts over. If there is an error, it logs the error to the
 */
const init = async () => {
  try {
    const jsonString = fs.readFileSync("./data/questions.json")
    const { questions, index } = JSON.parse(jsonString)
    const tweet = questions[index]
    if (!tweet) {
      fs.writeFileSync(
        "./data/questions.json",
        JSON.stringify({ index: 0, questions })
      )
      return init()
    }
    await sendTweet(tweet)
    fs.writeFileSync(
      "./data/questions.json",
      JSON.stringify({ index: index + 1, questions })
    )
  } catch (e) {
    console.error("Error: ", e)
  }
}

init()
