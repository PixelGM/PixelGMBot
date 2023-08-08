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

module.exports = CombineStory;
