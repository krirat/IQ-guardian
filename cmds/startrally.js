let fs = require('fs')
let awdList = require('../medlist.json')
const discord = require('discord.js')



module.exports.run = async (bots, message, args) => {


    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permission to start rallies!");

    if(!message.member.voiceChannel){
        return message.channel.send(":x: You must be in a voice channel to use this command!");
    } else {
    let uId;

    if(awdList[message.author.id].uID){
        uId = `! __Username:__ ${awdList[message.author.id].uID}` ;
    } else {
        uId = "!";
    }

    let room = message.member.voiceChannel;
    let mode;

    if (args[0]) {
        mode = args[0].replace(/_/g, " ");
    } else {
        mode = "Standard";
    }
    let link = args[1] || `None. Join the host in Roblox${uId}`;

    let embed = new discord.RichEmbed()
        .setColor("#75BEC4")
        .addField(`Rally type:`,`${mode}`)
        .addField(`Room:`,`${room}`)
        .addField(`Host:`,`${message.member.nickname || message.author.username}`)
        .addField(`Link:`,`${link}`);
    
    message.channel.send('@everyone __**Rally has started!**__, stay \'til the and to get a medal!');
    message.channel.send(embed);
    message.delete();
    
   
    }
}

module.exports.help = {
    name: "startrally"
}