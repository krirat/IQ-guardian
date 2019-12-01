const botconfig = require("./botconfig.json");
const discord = require("discord.js")
const fs = require("fs")
var testMode = false
var act
var type
var stat


if(testMode === false){
    act = "television"
    type = {type:"WATCHING"}
    stat = 'online'
} else { 
    act = "Test Mode"
    type = {type:"PLAYING"}
    stat = 'idle'
}

const bot = new discord.Client();
bot.commands = new discord.Collection

fs.readdir("./cmds/", (err, files) => {
    if(err)console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }
    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


//Other Stuff
bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready!`);

    bot.user.setActivity(act,type);
    bot.user.setStatus(stat);
    
    bot.generateInvite(["ADMINISTRATOR"]).then( link => {
        console.log(link);
    }).catch(err => {
        console.log(err.stack);
    });
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'immigration')
    if (!channel) return;
    channel.send(`Welcome to ${member.guild.name}, ${member}! Enjoy your stay!`);
  });

bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', 'immigration')
    if (!channel) return;
    channel.send(`Goodbye ${member}! Come back again soon!`);
  });

bot.on('error', err => {
    setTimeout(func => {bot.login(botconfig.token)}, 100);
    console.log(`An error occurred! \n${err}`);
});

//Commands
bot.on("message", async message => {

    if(testMode === true && message.author.username !== "Pete") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!cmd.startsWith(prefix)) return;
    

    let command = bot.commands.get(cmd.slice(prefix.length));
    if(command) command.run(bot, message, args);

});
bot.login(botconfig.token);