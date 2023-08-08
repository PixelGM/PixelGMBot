const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");
const CombineStory = require("./CombineStory");
const handleStory = require("./handleStory");

const storyCollector = new CombineStory();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.author.bot) return;

  // Summarize Story ----------------------------------------

  // Check Message if more than 1 word
  handleStory(message);

  // Define content variable here
  const content = message.content.trim().toLowerCase();
});

keepAlive();
client.login(process.env.BOT_TOKEN);