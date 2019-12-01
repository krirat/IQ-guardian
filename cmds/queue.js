const musicMod = require('./music.js')
const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send(":x: You must be in a voice channel to use this command!")
    let queue = musicMod.mList
    let str = '' 

    queue.forEach((v,i) => {
         str = str + `\n${i+1}: ${v}`
    })

    let embed = new discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#75BEC4")
    .addField("Queue:", str || "No songs in queue!")

    message.channel.send(embed)
}

module.exports.help = {
    name: "queue"
}