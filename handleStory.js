class CombineStory {
  constructor() {
    this.isCollecting = false;
    this.story = [];
  }

  start() {
    this.isCollecting = true;
    this.story = [];
  }

  addWord(word) {
    if (this.isCollecting) {
      this.story.push(word);
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
    storyCollector.start();
  } else if (content === "!summarize") {
    const summary = storyCollector.summarize();
    message.reply(summary);
  } else if (storyCollector.isCollecting) {
    if (content.split(" ").length > 1) {
      try {
        await message.delete();
      } catch (error) {
        console.error(error);
      }
    } else {
      storyCollector.addWord(content);
    }
  }
}

module.exports = handleStory;
