module.exports.run = (bot, message, args) => {
    let role = message.guild.roles.find(r => r.name === "Dead");
    if (!role) return message.author.send(':x: Sorry, no suicide here.');
    message.member.roles.forEach((role,i) => {
        message.member.removeRole(role);
    });

    message.member.addRole(role);
    message.author.send("You've killed yourself! Please wait for an admin to revive you...");
    message.channel.send(`${message.author} has killed him/herself! Drop an **F** in the chat...`);
    
}

module.exports.help = {
    name: "suicide"
}