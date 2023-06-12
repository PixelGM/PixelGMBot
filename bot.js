const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server")

client.on("ready", () => {
    console.log("I am ready!");
});

const prefix = "`";
const prefix2 = "'";

client.on("message", message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    var msg = message.content.toLowerCase();
    var mention = message.mentions.users.first();
    const swearWords = ["fuck", "bitch", "gay", "shit", "noob", "retard", "stupid", "bego", "asu"];
    const retardedquestions = ["how", "where", "give", "pls", "plis", "please", "ples", "fix", "how"];
    

    //ping -> ping (For Testing)
    if (message.content === "ping") {
    	message.reply("pong");
    }

    //`hi -> Hi!
    if (message.content === "hi") {
        message.reply("Hi!");
    }

    /*
    //PixelGM is mentioned
    if (message.isMentioned(client.users.get("332111257735790593"))) {
        if (message.author.bot) return;
        if (message.author.id === "332111257735790593") { //PixelGM
            return;
        }
        if (message.author.id === "201717687427006464") { //Martin
            return;
        }
        if (message.author.id === "239471625865527296") { //Durk
            return;
        }
        else {
            message.reply("Do not ping him!");
        }
    }
    */

    //DM someone without knowing the sender
    if (msg.startsWith(prefix + "msg") || msg.startsWith(prefix + "dm") || msg.startsWith(prefix2 + "dm")) {
        if (mention == null) {
            message.reply("Msg is null!");
            return;
        }
        message.delete();
        mentionMessage = message.content.slice(8);
        mention.sendMessage(mentionMessage);
        message.channel.send("Sent!")
    }

    if (msg.startsWith(prefix + "help") || msg.startsWith(prefix2 + "help") || msg.startsWith(prefix + "cmd") || msg.startsWith(prefix2 + "cmd") || msg.startsWith(prefix + "command") || msg.startsWith(prefix2 + "command") || msg.startsWith(prefix + "commmands") || msg.startsWith(prefix2 + "commmands")) {
        message.channel.send("> __Prefix + My Commands:__ \n > dm or msg: to dm though the bot (`dm {mention} [message]) \n > emojis: list of emojis \n > invite/invt/ivt: get the invite link for PixelGMBot. \n > clear + [1-100]: bulk clear messages. \n > say + [word]: say exacly the word you say. \n > time: shows time in UTC")
    }

    //If bot is mentioned
    if (message.isMentioned(client.users.get("703579067211055156"))) {
        if (message.author.bot) return;
        if (message.author.id === "332111257735790593") {
            message.channel.sendMessage("Yes master? What do you need?")
        }
        else {
            message.reply("My prefix is ` or '");
        }
    }

    //Clear
    if (msg.startsWith(prefix + "clear") || msg.startsWith(prefix2 + "clear")){
        if (message.author.bot) return;
        
        if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.author.id === "332111257735790593") return message.reply("I don't have MANAGE_MESSAGES permission!");
        if(!message.content.substring(7)) return message.channel.send("Enter the number of messages you want to delete.");
        message.channel.bulkDelete(message.content.substring(7)).then(() =>{
        message.channel.send(message.content.substring(7) + ' Messages Deleted').then(message => message.delete(5000));
        });
    }

    //Time
    if (msg.startsWith(prefix + "time") || msg.startsWith(prefix2 + "time")){
        let d = new Date();
        message.channel.send("Time in UTC is " + d.getHours() + ":"+d.getMinutes(), {
            tts: true
        })
    }

    //Say
    if (msg.startsWith(prefix + "say") || msg.startsWith(prefix2 + "say")){
        let botmessage = message.content.substring(5);
        message.channel.send(botmessage, {
            tts: true
           });
    }

    //SwearWord
    if (swearWords.some(word => message.content.toLowerCase().includes(word)) && message.isMentioned(client.users.get("703579067211055156"))){
        if (message.author.id === "332111257735790593")
            return;

        else {
          message.reply("no u");   
        }
    }
    
    // Ban
    if(msg === "ban") {
        if(!message.member.hasPermission('BAN_MEMBERS')) 
            return message.reply("You don't have permission to use that command.");
        
        let user = message.mentions.users.first();
  
        if(!user) 
            return message.reply("Please mention someone to ban.");
  
        if(!message.guild.member(user).bannable) 
            return message.reply("I cannot ban that user. Do they have a higher role? Do I have ban permissions?");
  
        message.guild.member(user).ban().then(() => {
            message.reply(`${user.tag} was banned.`);
        }).catch(err => {
            message.reply("I was unable to ban the user.");
            console.error(err);
        });
    }
    
    // Kick
    if(msg === "kick") {
        if(!message.member.hasPermission('KICK_MEMBERS')) 
            return message.reply("You don't have permission to use that command.");
        
        let user = message.mentions.users.first();
  
        if(!user) 
            return message.reply("Please mention someone to kick.");
  
        if(!message.guild.member(user).kickable) 
            return message.reply("I cannot kick that user. Do they have a higher role? Do I have kick permissions?");
  
        message.guild.member(user).kick().then(() => {
            message.reply(`${user.tag} was kicked.`);
        }).catch(err => {
            message.reply("I was unable to kick the user.");
            console.error(err);
        });
    }


    //https://discord.com/oauth2/authorize?client_id=703579067211055156&scope=bot&permissions=8
    //Bot Invite Link
    if (msg.startsWith(prefix + "invite") || msg.startsWith(prefix + "invt") || msg.startsWith(prefix + "ivt") || msg.startsWith(prefix2 + "invite") || msg.startsWith(prefix2 + "invt") || msg.startsWith(prefix2 + "ivt")){
        message.channel.send("https://discord.com/oauth2/authorize?client_id=703579067211055156&scope=bot&permissions=8")
    }

    ////////////////////////////////////////////EMOJIS///////////////////////////////////////////////////////////////////
    if (msg.startsWith(prefix + "emojis") || msg.startsWith(prefix2 + "emojis")) {
        message.channel.send("coffin, kira, verified, pepecri, triggered, roasted, distracted, annoyed, wideputin, damage, iri, gei, dab, kiddab, sniper, slav, gogogo, happy, paste, kermit");
    }
    
    if (msg.startsWith(prefix + "coffin") || msg.startsWith(prefix2 + "coffin")) {
        message.delete();
        message.channel.send("https://tenor.com/view/rip-coffin-black-ghana-celebrating-gif-16743302");
    }

    if (msg.startsWith(prefix + "kira") || msg.startsWith(prefix2 + "kira")) {
        message.delete();
        message.channel.send("<a:6565_kiradance:704260143893839944>");
    }

    if (msg.startsWith(prefix + "verified") || msg.startsWith(prefix2 + "verified")) {
        message.delete();
        message.channel.send("<:8124_DiscordPartnerServer:704263607508140042>");
    }

    if (msg.startsWith(prefix + "pepecri") || msg.startsWith(prefix2 + "pepecri")) {
        message.delete();
        message.channel.send("<a:pepecri:706381997655982150>");
    }

    if (msg.startsWith(prefix + "triggered") || msg.startsWith(prefix2 + "triggered")) {
        message.delete();
        message.channel.send("<a:triggered:715548824998903908>");
    }

    if (msg.startsWith(prefix + "roasted") || msg.startsWith(prefix2 + "roasted")) {
        message.delete();
        message.channel.send("https://tenor.com/view/qc-got-roast-quebec-get-gif-13626924");
    }

    if (msg.startsWith(prefix + "distracted") || msg.startsWith(prefix2 + "distracted")) {
        message.delete();
        message.channel.send("https://tenor.com/view/henry-stickmin-the-henry-stickmin-collection-distraction-gif-18174155");
    }

    if (msg.startsWith(prefix + "annoyed") || msg.startsWith(prefix2 + "annoyed")) {
        message.delete();
        message.channel.send("https://tenor.com/view/cant-sleep-annoyed-insomnia-attacks-gif-4928497");
    }
    
    if (msg.startsWith(prefix + "wideputin") || msg.startsWith(prefix2 + "wideputin")) {
        message.delete();
        message.channel.send("https://tenor.com/view/wide-putin-walking-looking-gif-17745710");
    }

    
    if (msg.startsWith(prefix + "damage") || msg.startsWith(prefix2 + "damage")) {
        message.delete();
        message.channel.send("https://tenor.com/view/damage-thats-alot-of-damage-jon-tron-gif-13054497");
    }

    
    if (msg.startsWith(prefix + "iri") || msg.startsWith(prefix2 + "iri")) {
        message.delete();
        message.channel.send("https://tenor.com/view/iri-bilang-bos-andovi-gif-18062588");
    }
    
    if (msg.startsWith(prefix + "noice") || msg.startsWith(prefix2 + "noice")) {
        message.delete();
        message.channel.send("https://tenor.com/view/noice-nice-click-gif-8843762");
    }
    
    if (msg.startsWith(prefix + "gei") || msg.startsWith(prefix2 + "gei")) {
        message.delete();
        message.channel.send("https://tenor.com/view/why-are-you-gae-why-why-are-you-gae-gif-14511302");
    }
    
    if (msg.startsWith(prefix + "dab") || msg.startsWith(prefix2 + "dab")) {
        message.delete();
        message.channel.send("https://tenor.com/view/dab-pogba-bad-pogba-gif-7345779");
    }
    
    if (msg.startsWith(prefix + "kiddab") || msg.startsWith(prefix2 + "kiddab")) {
        message.delete();
        message.channel.send("https://tenor.com/view/dab-dancing-idgaf-gif-5661979");
    }
    
    if (msg.startsWith(prefix + "sniper") || msg.startsWith(prefix2 + "sniper")) {
        message.delete();
        message.channel.send("https://tenor.com/view/feeling-cute-funny-animals-sniper-get-down-gif-13946617");
    }

    if (msg.startsWith(prefix + "slav") || msg.startsWith(prefix2 + "slav")) {
        message.delete();
        message.channel.send("https://tenor.com/view/slav-dance-adidas-funny-gif-13900821");
    }

    if (msg.startsWith(prefix + "gogogo") || msg.startsWith(prefix2 + "gogogo")) {
        message.delete();
        message.channel.send("https://tenor.com/view/hard-bass-life-of-boris-driving-dance-vibing-gif-17559309");
    }

    if (msg.startsWith(prefix + "happy") || msg.startsWith(prefix2 + "happy")) {
        message.delete();
        message.channel.send("https://tenor.com/view/hard-bass-gif-7344399");
    }

    if (msg.startsWith(prefix + "paste") || msg.startsWith(prefix2 + "paste")) {
        message.delete();
        message.channel.send("https://tenor.com/view/copy-paste-paste-copy-ctrl-c-ctrl-v-gif-12913156");
    }

    if (msg.startsWith(prefix + "kermit") || msg.startsWith(prefix2 + "kermit")) {
        message.delete();
        message.channel.send("https://tenor.com/view/freaking-out-kermit-gif-8832122");
    }
});

keepAlive()

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN
);
