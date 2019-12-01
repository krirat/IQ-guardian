const discord = require('discord.js')
const data = require("../pghandler")

module.exports.run = async (bots, message, args) => {

    let target = message.author || message.author.members.first();
    data.loadData('medals',`uname = '${target.username}'`, function(dat) {
        if(!dat) return message.channel.send(":x: No data found! Please ?verify in order to use it. If you're already verified, please report the bug to <@363285035073273867>.");

        let embed = new discord.RichEmbed()
            .setAuthor("Medals:")
            .setColor("#75BEC4")
            .addField( target.username || target.user.username, `**${dat[0].medals} medal(s)**`);
            message.channel.send(embed);

        console.log(JSON.stringify(dat));
    });
}

module.exports.help = {
    name: "medals"
}