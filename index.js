const discord = require('v11-discord.js'),client=new discord.Client(),needle=require('needle'),fs=require('fs'),crypto=require('crypto-js'),gradient=require('gradient-string'),{execSync}=require('child_process')
var config=require('./config.json'),token=config.token,prefix=config.prefix
client.login(token).catch(e => console.log(gradient("red", "orange")("Invalid Token"))
client.on('message', (message) => {
    if (message.author.id != client.user.id) return;
    if (!message.content.startsWith(prefix)) return;
    var arg = message.content.substring(prefix.length).split(" ");
    var argument =  message.content.split(" ");
    switch(arg[0]){
        case "extract":
            message.delete()
            if (message.channel.type == "group" || message.channel.type == "dm") return console.log(gradient("red", "orange")("Not a good idea to download images from dms or groups"))
            message.channel.fetchMessages().then(m => {
                m.forEach(img => {
                    img.attachments.forEach(url => {
                        var urls = url.url.split('\n')
                        if (!fs.existsSync(`./images/${message.guild.name}`)) {
                            fs.mkdirSync(`./images/${message.guild.name}`)
                        } else {}
                        urls.forEach(msg => {
                            needle.get(msg).pipe(fs.createWriteStream(`./images/${message.guild.name}/${hash(2)}.png`))
                        })
                    })
                });
            })
            console.log(gradient.teen('[ WaifuWare Inc. ]'),gradient("green", "green")(`Successfully extracted all images from ${message.guild.name} in ${message.channel.name}`))
        break;
        case "hbomb":
            message.delete()
            if (!argument[1]) return console.log(gradient("red", "orange")("Please specify the number of image to send"))
            var urls = [
                "https://api.waifu.pics/nsfw/waifu",
                "https://api.waifu.pics/nsfw/neko",
                "https://api.waifu.pics/nsfw/blowjob"
            ]
            for(let i=0;i<argument[1];i++) {
                var b = urls[Math.floor(Math.random() * urls.length)]
                needle('get', b).then(r => {
                    message.channel.send(r.body.url)
                })
            }
            console.log(gradient.teen('[ WaifuWare Inc. ]'),gradient("green", "green")(`Successfully executed hbomb`))
        break;
    }
})
client.on("ready", async() => {
    clear()
    console.log(gradient.instagram(`

                                                                                                                                                 
        _|          _|            _|      _|_|            _|          _|                                    _|_|_|                      
        _|          _|    _|_|_|        _|      _|    _|  _|          _|    _|_|_|  _|  _|_|    _|_|          _|    _|_|_|      _|_|_|  
        _|    _|    _|  _|    _|  _|  _|_|_|_|  _|    _|  _|    _|    _|  _|    _|  _|_|      _|_|_|_|        _|    _|    _|  _|        
          _|  _|  _|    _|    _|  _|    _|      _|    _|    _|  _|  _|    _|    _|  _|        _|              _|    _|    _|  _|        
            _|  _|        _|_|_|  _|    _|        _|_|_|      _|  _|        _|_|_|  _|          _|_|_|      _|_|_|  _|    _|    _|_|_|  
                                                                                                                                        
                                                                                                                                 
                                                                                        
                `),gradient.cristal(`                                                                                                                 
                                        ${client.user.username} is horny uwu
                                        Prefix :: ${prefix}
                                        Github :: https://github.com/WaifuWare
                                        Author :: TaxMachine`),gradient.teen(`


                ${prefix}extract --> it extracts images from a text channel
                ${prefix}hbomb [int] --> sends the given integer of hentai in a text channel 
    `))
    if (!fs.existsSync('./images')) return fs.mkdirSync('./images')
})
function hash(length) {
    var result ="",characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
    return crypto.MD5(result);
}
function clear() {
    switch(process.platform){
        case "win32":
            execSync('powershell.exe clear')
        break;
        default:
            execSync('clear')
        break;
    }
}
