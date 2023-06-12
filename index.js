const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");

const prefix1 = "`";
const prefix2 = "'";

const swearWords = ["fuck", "bitch", "gay", "shit", "noob", "retard", "stupid", "bego", "asu"];
const commandHandlers = {
  "ping": handlePing,
  "hi": handleHi,
  "msg": handleMsg,
  "dm": handleMsg,
  "help": handleHelp,
  "cmd": handleHelp,
  "command": handleHelp,
  "commmands": handleHelp,
  "clear": handleClear,
  "time": handleTime,
  "say": handleSay,
  "ban": handleBan,
  "kick": handleKick,
  "invite": handleInvite,
  "invt": handleInvite,
  "ivt": handleInvite,
  "emojis": handleEmojis,
  // Add more commands here...
};

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.author.bot) return;
  const content = message.content.trim().toLowerCase();
  const command = content.split(" ")[0];
  if (command.startsWith(prefix1) || command.startsWith(prefix2)) {
    const strippedCommand = command.slice(1);
    if (commandHandlers[strippedCommand]) {
      commandHandlers[strippedCommand](message);
    }
  }
  
  if (swearWords.some(word => message.content.toLowerCase().includes(word)) && message.isMentioned(client.users.get("703579067211055156"))){
    if (message.author.id !== "332111257735790593"){
      message.reply("no u");   
    }
  }
});



function handlePing(message) {
  message.reply("Pong!");
}

function handleHi(message) {
  message.reply("Hello there!");
}

function handleMsg(message) {
  const recipient = message.mentions.users.first();
  if (!recipient) {
    return message.reply("You need to mention someone to send them a DM!");
  }
  const content = message.content.split(" ").slice(1).join(" ");
  recipient.send(content);
}

function handleHelp(message) {
  message.reply("Here is a list of commands I can respond to: " + Object.keys(commandHandlers).join(", "));
}

function handleClear(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("You don't have permission to do that!");
  }
  message.channel.bulkDelete(100).catch(console.error);
}

function handleTime(message) {
  message.reply("The current time is: " + new Date().toLocaleTimeString());
}

function handleSay(message) {
  const content = message.content.split(" ").slice(1).join(" ");
  message.channel.send(content);
}

async function handleBan(message) {
  // split the message content into words
  const args = message.content.split(' ');

  // remove the first word (the command itself)
  args.shift();

  // get the user to be banned
  const userToBan = message.mentions.users.first();

  // check if the author of the message has the necessary permissions
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.reply("You don't have permission to do that!");
  }

  // check if a user was mentioned for the ban
  if (!userToBan) {
    return message.reply("You need to mention someone to ban them!");
  }

  // remove the mention from the args
  args.shift();

  // join the remaining words to form the reason
  const reason = args.join(' ');

  // get the member object for the user to be banned
  let memberToBan = message.guild.members.cache.get(userToBan.id);

  // ban the user
  try {
    await memberToBan.ban({reason});
    // if the ban was successful, send a message
    message.reply(`Successfully banned ${userToBan.username} for reason: ${reason}`);
  } catch (err) {
    // if the ban was unsuccessful, log the error
    console.error(err);
    message.reply("I was unable to ban the user");
  }
}

async function handleKick(message) {
  // split the message content into words
  const args = message.content.split(' ');

  // remove the first word (the command itself)
  args.shift();

  // get the user to be kicked
  const memberToKick = message.mentions.members.first();

  // check if the author of the message has the necessary permissions
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply("You don't have permission to do that!");
  }

  // check if a user was mentioned for the kick
  if (!memberToKick) {
    return message.reply("You need to mention someone to kick them!");
  }

  // remove the mention from the args
  args.shift();

  // join the remaining words to form the reason
  const reason = args.join(' ');

  // kick the user
  try {
    await memberToKick.kick(reason);
    // if the kick was successful, send a message
    message.reply(`Successfully kicked ${memberToKick.user.username} for reason: ${reason}`);
  } catch (err) {
    // if the kick was unsuccessful, log the error
    console.error(err);
    message.reply("I was unable to kick the user");
  }
}

function handleInvite(message) {
  message.channel.createInvite({maxAge: 0})
    .then(invite => message.reply("Here is your invite: " + invite.url))
    .catch(console.error);
}

function handleEmojis(message) {
  message.reply("Here are the server's emojis: " + message.guild.emojis.cache.map(e => e.toString()).join(" "));
}



keepAlive();
client.login(process.env.BOT_TOKEN);