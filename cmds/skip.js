const musicMod = require('./music.js')

module.exports.run = async (bot, message, args) => {
    
    if(!message.member.voiceChannel) { 
            return message.channel.send(":x: You must be in a voice channel to use this command!");
        } else if (bot.voiceConnections) {
            if (musicMod.music.length == 1) {
                message.member.voiceChannel.leave()
            } else {
                musicMod.playSong(musicMod.music[1],message.member.voiceChannel)
            }
            message.channel.send(':ok_hand: Skipped song!')
        } else return message.channel.send('Try it in another channel!')
    
}    
        

module.exports.help = {
    name:"skip"
}