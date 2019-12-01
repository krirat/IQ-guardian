const discord = require('discord.js');
const data = require('../pghandler');

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

    var add = Number(args[0]) || 1;

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permission to end rallies.");
    if(!message.member.voiceChannel) return message.channel.send(":x: You must be in a voice channel to use this command!");

    let nameList = [];
    let memArray = message.member.voiceChannel.members.array(); 
    memArray.forEach((u, i) => {
        if (u.user.bot === true) {
            memArray.splice(i,1);
        }
        nameList[i] = `'${u.user.username}'`;
    });

    nameList.toString();
    console.log(nameList);

    data.saveData(`medals = medals + ${add}`, `uname IN(${nameList})`);

    let embed = new discord.RichEmbed()
    .setTitle(`__Rally has ended on ${message.createdAt.toUTCString(3)}.__`)
    .addField(`Members who participated:`,`${memArray}`)
    .setFooter(`They have been awarded ${add} medal(s)!`);

    message.channel.send(embed);
    message.delete();
    
 
    data.loadData('uname, medals',`uname IN(${nameList})`, (dat) => {
        dat.forEach((v,i) => {
            console.log("Out",i,v.uname,v.medals)
            let med = v.medals
            let name = v.uname
            let user = message.guild.members.find(val => val.user.username === '' + name)
    
            console.log('attempting to start search...')
            for (var req in ranks){
                console.log('searching...', req, med)
                if(req == med){
                    console.log('found match!')
                    let role = message.guild.roles.find(r => r.name === ranks[req]);
                        for(var i in rankId){
                            user.removeRole(rankId[i]).catch(console.error);
                        }
                    user.addRole(role)
                    console.log(role)
                    console.log('USER:',user)
                    message.channel.send(`**${user.nickname}** has been promoted to **${ranks[req]}**! Congratulations!`)
                    break
                } else {
                    console.log('no match')
                }
            }
        })
        
    });
/*
    memArray.forEach(function(v,i,a) {

        let recieve = memArray[i];
        let awd = data.loadData()

        data.loadData('medals',`uname = '${recieve.username}'`, function(dat) {
            if(!dat) return console.log(":x: No data found!");
    
dat[0].medals
                message.channel.send(embed);
    
            console.log(JSON.stringify(dat));
        });
   
    
        

        
            console.log(awdList[recieve.id].medal)
            awdList[recieve.id].medal = add + awdList[recieve.id].medal
            
            fs.writeFile('./medlist.json', JSON.stringify(awdList,null,3), (err) => {
                if (err) console.log(err);
            });
            console.log(awdList[recieve.id].medal)
            let med = awdList[recieve.id].medal
    
            console.log('attempting to start search...')
            for (var req in ranks){
                console.log('searching...', req, med)
                if(req == med){
                    console.log('found match!')
                    let role = message.guild.roles.find(r => r.name === ranks[req]);
                        for(var i in rankId){
                            recieve.removeRole(rankId[i]).catch(console.error);
                        }
                    recieve.addRole(role)
                    console.log(role)
                    message.channel.send(`${recieve} has been promoted to ${ranks[req]}! Congratulations!`)
                    break
                } else {
                    console.log('no match')
                }
            }
    });
*/    

}

module.exports.help = {
    name: "endrally"
}