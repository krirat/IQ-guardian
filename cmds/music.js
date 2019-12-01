const ytdl = require('ytdl-core');
const searchyt = require('yt-search');
const discord = require('discord.js');
const streamOptions = { seek: 0, volume: 1 };

module.exports.music = []
module.exports.mList = []
module.exports.loop = false

module.exports.togLoop = async () => {
    module.exports.loop = !module.exports.loop
}

module.exports.playSong = async (vid,vc) => {
    vc.join().then(connection => {
        const stream = ytdl(vid, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
       
        dispatcher.on('end', async () => {
            console.log(module.exports.music)
            if (module.exports.loop == false){
                module.exports.music.shift()
                module.exports.mList.shift()
            }

            if (module.exports.music.length == 0){
                vc.leave()
            } else {
                await module.exports.playSong(module.exports.music[0],vc)
            }
        })
       
    })

}
module.exports.run = async (bot, message, args) => {

    if(!message.member.voiceChannel) {
        return message.channel.send(":x: You must be in a voice channel to use this command!");
    } else if (args[0]){
        let mes = message.channel.send("Searching...").then(msg => msg.delete(5000))
        
        console.log(args.join(" "))
        searchyt(args.join(" "), (err, r) => {
            if(err) return console.log(err);
            let vid = `https:/www.youtube.com${r.videos[0].url}`
            console.log(r.videos[0].url,vid);

            if(module.exports.music.some(ele => ele == vid)){
                return message.channel.send("Already in queue!")
            } else {
                module.exports.music.push(vid)
                module.exports.mList.push(r.videos[0].title)
                console.log(module.exports.music)
            }

            let embed = new discord.RichEmbed()
            .setAuthor('Added to queue', message.author.displayAvatarURL)
            .setTitle(r.videos[0].title)
            .setThumbnail(`https://img.youtube.com/vi/${r.videos[0].videoId}/default.jpg`)
            .addField('Created by:',r.videos[0].author.name,true)
            .addField('Length:',r.videos[0].timestamp,true)

            message.channel.send(embed)
            if (module.exports.music.length == 1) module.exports.playSong(vid,message.member.voiceChannel);
        })
    } else {return message.channel.send('Enter a song name!')}   
}

module.exports.help = {
    name: "music"
}