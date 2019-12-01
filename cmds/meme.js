module.exports.run = async (bots, message, args) => {

let memes = [
    "https://i.redd.it/hkfome5o9rm01.jpg",
    "https://i.imgur.com/jijkHHn.jpg",
    "https://i.redd.it/z4t09m3jgrm01.jpg",
    "https://i.redd.it/9d5lgnux2qm01.png",
    "https://i.redd.it/9d5lgnux2qm01.png",
    "https://i.imgur.com/xMbfYao.jpg",
    "https://i.redd.it/oc5phcxjxrm01.jpg"
]

let rng = Math.floor(Math.random() * (memes.length + 1));
 
message.channel.send(`${memes[rng]}`)

}
module.exports.help = {
    name: "meme"
}

