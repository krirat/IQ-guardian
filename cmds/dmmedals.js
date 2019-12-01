const fs = require("fs");
const discord = require('discord.js')

module.exports.run = async (bots, message, args) => {

    let medal = require('../medlist.json');

    if(!message.mentions.members.first() && args[0]){
        console.log("alt") 
        let target = args[0]
        if (!medal[target]) return message.channel.send(':x: Use a valid user ID!');
        let embed = new discord.RichEmbed()
        .setAuthor("Medals:")
        .setColor("#75BEC4")

        if (medal[target].avaURL){
            embed.setThumbnail(medal[target].avaURL)
        }

        try {
            embed.addField(`${medal[target].uName} (${medal[target].uID})` || "This person has...",`**${medal[target].medal} medal(s)**`);
            
        } catch(e) {
            return message.channel.send('An error occurred!');
        }
        
        message.author.send(embed)
        
        return;
    }

    
    
    let target = message.mentions.members.first() || message.author;

    if(!medal[target.id]){     
        medal[target.id] = {
            medal: 0
        };
        
        fs.writeFile("./medlist.json", JSON.stringify(medal,null,3), err => {
            if(err) console.log(err);
        });
    
    }

    let embed = new discord.RichEmbed()
    .setAuthor("Medals:")
    .setColor("#75BEC4")
    .setThumbnail(target.user.displayAvatarURL || target.displayAvatarURL)
    .addField(target.nickname, `**${medal[target.id].medal} medal(s)**`);

    message.author.send(embed);

}

module.exports.help = {
    name: "dmmedals"
}
