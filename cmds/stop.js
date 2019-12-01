

const ytdl = require('ytdl-core');
const searchyt = require('yt-search');
const discord = require('discord.js');
const streamOptions = { seek: 0, volume: 1 };

module.exports.run = async (bot, message, args) => {
    
    if(!message.member.voiceChannel) { 
            return message.channel.send(":x: You must be in a voice channel to use this command!");
        } else if (bot.voiceConnections){
            message.member.voiceChannel.leave()
            } else return message.channel.send('Already disconnected!')
    
}    
        

module.exports.help = {
    name:"stop"
}