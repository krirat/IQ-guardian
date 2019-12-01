const data = require('../pghandler');
const discord = require('discord.js');

//config
var ranks = {
    0: "Recruit",
    2: "Private",
    6: "Corporal",
    16: "Sergeant"
}



module.exports.run = async (bots, message, args) => {

    var rankId = {
        1: message.guild.roles.find(r => r.name === ranks[0]),
        2: message.guild.roles.find(r => r.name === ranks[2]),
        3: message.guild.roles.find(r => r.name === ranks[6]),
        4: message.guild.roles.find(r => r.name === ranks[16])
    }

    let recieve = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permission to award medals.");
    if(!recieve) return message.channel.send(":x: You did not specify a player or ID! Try to mention them or copy their ID.");

    var add = Number(args[1]) || 1;

    data.updateData(`medals = medals + ${add}`, `uname = '${recieve.user.username}'`);

    let embed = new discord.RichEmbed()
    .setTitle(`__Medal Awarded.__`)
    .addField(`${recieve.user.username} has been awarded ${add} medals!`,'Keep up the good work!')
    .setFooter(`${message.author.username} awarded medals to ${recieve.user.username}`);

    message.channel.send(embed);

    data.loadData("medals",`uname = '${recieve.user.username}'`, med => {
        med = med[0].medals
        for (var req in ranks){
            console.log('searching...', req, med)
            if(req == med){
                console.log('found match!')
                let role = message.guild.roles.find(r => r.name === ranks[req]);
                for(var i in rankId){
                    recieve.removeRole(rankId[i]).catch(console.error);
                }
                    recieve.addRole(role) 
                    message.channel.send(`${recieve.nickname} has been promoted to ${ranks[req]}! Congratulations!`)

                break
            } else {
                console.log('no match')
            }
        }
    });

    
}

module.exports.help = {
    name: "awardmedal"
}