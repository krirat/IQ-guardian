module.exports.run = async (bots, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the **Manage Messages** permission. You are not allowed to mute memebers.");
            
    let muted = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!muted) return message.channel.send(":x: You did not specify a player or ID! Try to @mention them or copy their ID.");
    if(muted.highestRole > message.member.highestRole) return message.channel.send(":x: You cannot unmute someone who has a higher role than you.");
    let role = message.guild.roles.find(r => r.name === "Muted");

    if(!muted.roles.has(role.id)) return message.channel.send(":x: This person is __already__ muted!");

    await muted.removeRole(role);
    message.channel.send(":ok_hand: This person has been __unmuted__.");

    }

module.exports.help = {
    name: "unmute"
}