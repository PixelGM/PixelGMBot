const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.author.bot) return;
  message.reply("Hello, World!");
});

keepAlive();
client.login(process.env.BOT_TOKEN);
