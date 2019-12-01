const musicMod = require('./music.js')

module.exports.run = async (bot, message, args) => {
    musicMod.togLoop()
    message.channel.send(`Toggle loop: ${musicMod.loop}`)
}

module.exports.help = {
    name: "loop"
}