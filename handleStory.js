class CombineStory {
  constructor() {
    this.isCollecting = false;
    this.story = [];
    this.lastUser = null; // Keep track of the last user
  }

  start() {
    this.isCollecting = true;
    this.story = [];
    this.lastUser = null;
  }

  addWord(word, user) {
    if (this.isCollecting && (!this.lastUser || this.lastUser !== user)) {
      this.story.push(word);
      this.lastUser = user;
    }
  }

  summarize() {
    this.isCollecting = false;
    return this.story.join(' ');
  }
}

const storyCollector = new CombineStory();

async function handleStory(message) {
  const content = message.content.trim().toLowerCase();

  if (content === "!start") {
    await message.delete(); // Delete the !start message
    storyCollector.start();
    message.reply("Story collection has started! Add words to the story.");
  } else if (content === "!sum") {
    try {
      await message.delete(); // Delete the !summarize message
      if (storyCollector.isCollecting) {
        const summary = storyCollector.summarize();
        message.reply(summary);
      } else {
        message.reply("You need to start the story first! Use the !start command.");
      }
    } catch (error) {
      console.error(error);
    }
  } else if (storyCollector.isCollecting) {
    if (content.split(" ").length > 1 || storyCollector.lastUser === message.author.id) {
      try {
        await message.delete();
      } catch (error) {
        console.error(error);
      }
    } else {
      storyCollector.addWord(content, message.author.id);
    }
  }
}

module.exports = handleStory;
