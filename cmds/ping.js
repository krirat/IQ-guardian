const discord = require("discord.js");

module.exports.run = async (bots, message, args) => {
    message.channel.send(`${message.author}  Pong!`);
    }

module.exports.help = {
    name: "ping"
}