const CombineStory = require("./CombineStory");

const storyCollector = new CombineStory();

async function handleStory(message) {
  const content = message.content.trim().toLowerCase();

  if (content === "!start") {
    storyCollector.start();
  } else if (content === "!summarize") {
    const summary = storyCollector.summarize();
    message.reply(summary);
  } else if (storyCollector.isCollecting) {
    // Check if the message contains more than one word
    if (content.split(" ").length > 1) {
      // Delete the message if it contains more than one word
      try {
        await message.delete();
        // Output message when more than 1 word
        // message.reply("Please enter only one word at a time for the story!");
      } catch (error) {
        console.error(error);
      }
    } else {
      storyCollector.addWord(content);
    }
  }
}

module.exports = handleStory;
