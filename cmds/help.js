const discord = require("discord.js");

module.exports.run = async (bots, message, args) => {

        let help = new discord.RichEmbed()
        .setTitle("Help:")
        .setDescription("Type **?[Command]** to use IQ Guardian.")
        .setColor("#006633")
        .addBlankField(false)
        .setAuthor(`User: ${message.author.username}#${message.author.discriminator}`)
        .addField("__General Commands:__","*Commands used, well, generally.*")
        .addField("?help","Shows a list of commands.")
        .addField("?ping", "Play Ping-Pong with you.")
        .addField("?myinfo", "Recieve information about your account.")
        .addBlankField(false)
        .addField("__Admin Commands:__","*Made for controlling people.*")
        .addField("?mute {@member}","Used for __muting__ people.")
        .addField("?unmute {@member}","Used for __unmuting__ people.")
        .addBlankField(false)
        .addField("__Fun Commands:__","*F is for fun.*")
        .addField("?meme","Get a meme. New memes *almost* every week.");

        message.channel.send(help)
    }

module.exports.help = {
    name: "help"
}