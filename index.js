const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");
const handleStory = require("./handleStory");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.author.bot) return;

  // Summarize Story ----------------------------------------

  // Check Message if more than 1 word
  handleStory(message);

  // Define content variable here
  // const content = message.content.trim().toLowerCase();

  // if (content === "!start") {
  //   storyCollector.start();
  // } else if (content === "!summarize") {
  //   const summary = storyCollector.summarize();
  //   message.reply(summary);
  // } else if (storyCollector.isCollecting) {
  //   storyCollector.addWord(content);
  // }
});

keepAlive();
client.login(process.env.BOT_TOKEN);