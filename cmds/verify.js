const fs = require("fs");
const discord = require('discord.js')
const data = require("../pghandler")

module.exports.run = async (bots, message, args) => {
/*
    let medal = require('../medlist.json');
    let target = message.author;
    let userID = args[0]

    if(!userID){
        return message.channel.send(":x: Enter your roblox username!")
    }
   

    if(!medal[target.id] || !medal[target.id].uID){  
        medal[target.id].uID = userID
        medal[target.id].uName = target.username
        medal[target.id].avaURL = target.displayAvatarURL
    
        fs.writeFile("./medlist.json", JSON.stringify(medal,null,3), err => {
            if(err) console.log(err);
        });

    } else {
        return message.channel.send(":x: You're already verified!")
    }

    let embed = new discord.RichEmbed()
    .setAuthor(`${target.username}`,target.displayAvatarURL)
    .setColor("#75BEC4")
    .addField(":white_check_mark: **Verified**","Welcome to the group!");
    message.channel.send(embed);
  */  

    let target = message.author;
    let userID = target.id;
    let rbx = args[0];

    if (!rbx) return message.channel.send(":x: Enter your roblox username!");

    data.loadData('uname', `id = '${target.id}'`, (rec) => {
         let embed = new discord.RichEmbed()
            .setAuthor(`${target.username}`,target.displayAvatarURL)
            .setColor("#75BEC4")
            .addField(":white_check_mark: **Verified**","Welcome to the group!");
        console.log('id: ',userID,'verify: ',rec)
        console.log(rec.length)
        if (rec.length !== 0) return message.channel.send(':x: You\'re already verified!');
        data.saveData(target.username, `'${userID}', 0, '${rbx}'`, () => {return message.channel.send(embed);}, true);
        console.log('not verified')
    })
   
    



    
}

module.exports.help = {
    name: "verify"
}