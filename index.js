const fs = require('fs');
const Discord = require('discord.js');
const C = new Discord.Client();
const funcs = require('./functions.js');
const dbut = require('discord-buttons')(C);
const request = require('request-promise');
const { MessageButton } = require('discord-buttons');
const {
    Client
} = require('discord.js-selfbot');
const SelfClient = new Client();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
C.on('ready', async() => {
    console.log(`${C.user.tag} is online`)
});
C.on('guildCreate',async(guild)=>{
    guild.channels.cache.get(guild.systemChannelID).send(new Discord.MessageEmbed()
    .setDescription('Thank you for choosing Aero Software, to set up please type **.help**!')
    .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
    .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
})
C.on('message', async (message) => {
    if(message.content.includes('.help')){
        message.react('✅')
        message.author.send(new Discord.MessageEmbed()
        .setTitle('Aero Softworks')
        .addFields({name:"Add Channel",value:".addchannel _desiredchannel_"},{name:"Bot Status",value:".botstatus"},{name:"Upload Condo",value:".upload _rbxtoken file_"},{name:"Condo Settings",value:".csettings | Overrides Previous Settings"},{name:"Invite Bot",value:".invite | Gives you invite link to bot"})
        .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
        .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
    }
    if(message.content.includes('.invite')){
        message.react('✅')
        message.author.send('https://discord.com/api/oauth2/authorize?client_id=881370521671970868&permissions=8&scope=bot')
    }
    if (message.content.includes('.csettings')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("you don't have enough permissions! <:uhohwtf:878659550507565056>");
        let filter = m => m.author.id === message.author.id
        if (!fs.existsSync(`./cookies/${message.guild.id}`)) {
            fs.mkdirSync(`./cookies/${message.guild.id}`);
        }
        fs.writeFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, '')
        message.channel.send(new Discord.MessageEmbed()
                .setAuthor('What will the game name be? (Type Space to have no game name)')
                .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
                .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
            .then(() => {
                message.channel.awaitMessages(filter, {
                        max: 1
                    })
                    .then(one => {
                        fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `${one.first().content}`);
                    })
                    .then(() => {
                        message.channel.send(new Discord.MessageEmbed()
                                .setAuthor('What will the description name be? (Type Space to have no description name)')
                                .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
                                .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
                            .then(() => {
                                message.channel.awaitMessages(filter, {
                                        max: 1
                                    })
                                    .then(two => {
                                        fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `\n${two.first().content}`)
                                    })
                                    .then(() => {
                                        message.channel.send(new Discord.MessageEmbed()
                                                .setAuthor('What will the max player count be? (Type "default" to have the player count be 50)')
                                                .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
                                                .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
                                            .then(() => {
                                                message.channel.awaitMessages(filter, {
                                                        max: 1
                                                    })
                                                    .then(count => {
                                                        if(parseInt(count.first().content)== NaN) return fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `\n50`);
                                                        if(count.first().content>100||count.first().content<1) return fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `\n50`);
                                                        fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `\n${count.first().content}`)
                                                    })
                                                    .then(() => {
                                                        message.channel.send(new Discord.MessageEmbed()
                                                                .setAuthor('What is your discord link? (Type "no" to have no description name)')
                                                                .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
                                                                .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
                                                            .then(() => {
                                                                message.channel.awaitMessages(filter, {
                                                                        max: 1
                                                                    })
                                                                    .then(three => {
                                                                        if (three.first()
                                                                            .content.toLowerCase() == "no") return message.channel.send(new Discord.MessageEmbed()
                                                                            .setAuthor(`Condo Settings for ${message.guild.name} set`)
                                                                            .addFields({
                                                                                name: "Game Name"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[0]
                                                                            }, {
                                                                                name: "Game Description"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[1]
                                                                            },
                                                                            {
                                                                                name: "Game Player Count"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[2]
                                                                            }, {
                                                                                name: "Social Link"
                                                                                , value: three.first()
                                                                                    .content
                                                                            })
                                                                            .setFooter('Aero Software | discord.gg/ZjCmxPPy28 | Do .csettings to reset settings')
                                                                            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'));
                                                                        if (!three.first()
                                                                            .content.toLowerCase()
                                                                            .includes('discord.gg/') || three.first()
                                                                            .content.toLowerCase()
                                                                            .includes('discord.com/invite/')) return message.channel.send(new Discord.MessageEmbed()
                                                                            .setAuthor(`Condo Settings for ${message.guild.name} set`)
                                                                            .addFields({
                                                                                name: "Game Name"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[0]
                                                                            }, {
                                                                                name: "Game Description"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[1]
                                                                            },
                                                                            {
                                                                                name: "Game Player Count"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[2]
                                                                            }, {
                                                                                name: "Social Link"
                                                                                , value: three.first()
                                                                                    .content
                                                                            })
                                                                            .setFooter('Aero Software | discord.gg/ZjCmxPPy28 | Do .csettings to reset settings')
                                                                            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'));
                                                                        fs.appendFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`, `\n${three.first().content}`)
                                                                        message.channel.send(new Discord.MessageEmbed()
                                                                            .setAuthor(`Condo Settings for ${message.guild.name} set`)
                                                                            .addFields({
                                                                                name: "Game Name"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[0]
                                                                            }, {
                                                                                name: "Game Description"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[1]
                                                                            },{
                                                                                name: "Game Player Count"
                                                                                , value: fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`)
                                                                                    .toString()
                                                                                    .split('\n')[2]
                                                                            }, {
                                                                                name: "Social Link"
                                                                                , value: three.first()
                                                                                    .content
                                                                            })
                                                                            .setFooter('Aero Software | discord.gg/ZjCmxPPy28 | Do .csettings to reset settings')
                                                                            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }
    if(message.content.includes('/setfile')){
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("you don't have enough permissions! <:uhohwtf:878659550507565056>");
        if (message.attachments.array()[0]==null) return message.reply("did you insert a file? <:uhohwtf:878659550507565056>");
        if (!message.attachments.array()[0].name.includes('.rbxlx')) return message.reply("this isn't a rbxlx file? <:uhohwtf:878659550507565056>");
        if (!fs.existsSync(`./cookies/${message.guild.id}`)){
            fs.mkdirSync(`./cookies/${message.guild.id}`);
            let src = await request(message.attachments.array()[0].attachment)
            fs.writeFileSync(`./cookies/${message.guild.id}/file.rbxlx`,src)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Successfully Set File!').setFooter('Aero Software | discord.gg/ZjCmxPPy28')
            .setDescription(`Saved file to ./cookies/${message.guild.id}/file.rbxlx`)
            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
        } else {
            let src = await request(message.attachments.array()[0].attachment)
            fs.writeFileSync(`./cookies/${message.guild.id}/file.rbxlx`,src)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Successfully Set File!').setFooter('Aero Software | discord.gg/ZjCmxPPy28')
            .setDescription(`Saved file to ./cookies/${message.guild.id}/file.rbxlx`)
            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'))
        }
    }
    if(message.content.includes('.upload')){
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("you don't have enough permissions! <:uhohwtf:878659550507565056>");
        let token = message.content.split(' ')[1];
        if (token==null||token.includes(' ')) return message.reply("what did you even insert? <:uhohwtf:878659550507565056>");
        if (message.attachments.array()[0]==null && !fs.existsSync(`./cookies/${message.guild.id}/file.rbxlx`)) return message.reply("did you insert a file? <:uhohwtf:878659550507565056>");
        if (!fs.existsSync(`./cookies/${message.guild.id}/file.rbxlx`) && !message.attachments.array()[0].name.includes('.rbxlx')) return message.reply("this isn't a rbxlx file? <:uhohwtf:878659550507565056>");
        if (!fs.existsSync(`./cookies/${message.guild.id}`)){
            fs.mkdirSync(`./cookies/${message.guild.id}`);
        }
        let src;
        if(!fs.existsSync(`./cookies/${message.guild.id}/file.rbxlx`)){
            src = await request(message.attachments.array()[0].attachment)
            fs.writeFileSync(`./cookies/${message.guild.id}/file.rbxlx`,src)
        }
        if(fs.existsSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`) != ""){
            let { UserID } = await request({uri: `https://www.roblox.com/mobileapi/userinfo`,headers: {Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token'],},json: true})
            let { data } = await request({url:`https://games.roblox.com/v2/users/${UserID}/games?sortOrder=Asc&limit=10`,json:true})
            let Cookie = fs.readFileSync(`./cookies/${message.guild.id}/${message.guild.id}.txt`).toString().split('\n')
            await request({method: "patch",url: `https://develop.roblox.com/v2/places/${data[0].rootPlace.id}`,body:JSON.stringify({"name":Cookie[0],"maxPlayerCount":Cookie[2],"description":Cookie[1],"allowCopying": false}),resolveWithFullResponse: true,headers: {'Content-Type':'application/json',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token']}})
            if(Cookie[3]!=null){
                if(Cookie[3].includes('https://')){
                    Cookie[3] = Cookie[3].split('https://')[1];
                }
                await request({method: "post",url: `https://develop.roblox.com/v1/universes/${data[0].id}/social-links`,headers: {'Content-Type':'application/json',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token'],},body: JSON.stringify({"type": "Discord","url": `https://${Cookie[3]}`,"title": Cookie[0]})})
            }
            await request({method: "post",url: `https://data.roblox.com/Data/Upload.ashx?json=1&assetid=${data[0].rootPlace.id}`,body:fs.readFileSync(`./cookies/${message.guild.id}/file.rbxlx`),resolveWithFullResponse: true,headers: {'Content-Type':'application/xml',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token']}})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Successfully Uploaded!').setFooter('Aero Software | discord.gg/ZjCmxPPy28')
            .setDescription(`https://www.roblox.com/games/${data[0].rootPlace.id}/Aero`)
            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'), new MessageButton()
            .setStyle('url')
            .setURL(`https://www.roblox.com/games/${data[0].rootPlace.id}/Aero`)
            .setLabel('🎮 Click Me To Join! 🎮'))
        } else {
            let { UserID } = await request({uri: `https://www.roblox.com/mobileapi/userinfo`,headers: {Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token'],},json: true})
            let { data } = await request({url:`https://games.roblox.com/v2/users/${UserID}/games?sortOrder=Asc&limit=10`,json:true})
            await request({method: "patch",url: `https://develop.roblox.com/v2/places/${data[0].rootPlace.id}`,body:JSON.stringify({"name":"Aero","maxPlayerCount":50,"description":"We cool n stuff","allowCopying": false}),resolveWithFullResponse: true,headers: {'Content-Type':'application/json',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token']}})
            await request({method: "post",url: `https://develop.roblox.com/v1/universes/${data[0].id}/social-links`,headers: {'Content-Type':'application/json',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token'],},body: JSON.stringify({"type": "Discord","url": "https://discord.gg/3CbwpkZ9Yw","title": "Aero on top"})})
            await request({method: "post",url: `https://data.roblox.com/Data/Upload.ashx?json=1&assetid=${data[0].rootPlace.id}`,body:fs.readFileSync(`./cookies/${message.guild.id}/file.rbxlx`),resolveWithFullResponse: true,headers: {'Content-Type':'application/xml',Cookie: `.ROBLOSECURITY=${token}`,"X-CSRF-TOKEN": (await request({url:"https://auth.roblox.com/v2/logout",method:"POST",simple:false,resolveWithFullResponse:true,headers:{'Cookie':`.ROBLOSECURITY=${token}`}})).headers['x-csrf-token']}})
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Successfully Uploaded!').setFooter('Aero Software | discord.gg/ZjCmxPPy28')
            .setDescription(`https://www.roblox.com/games/${data[0].rootPlace.id}/Aero`)
            .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'), new MessageButton()
            .setStyle('url')
            .setURL(`https://www.roblox.com/games/${data[0].rootPlace.id}/Aero`)
            .setLabel('🎮 Click Me To Join! 🎮'))
        }
    }
    if (message.content.toLowerCase()
        .includes('.memestring')) {
        if (!message.guild.id == 878466926555308104) return message.reply("this isn't Aero Softworks <:uhohwtf:878659550507565056>")
        if (message.member.hasPermission('ADMINISTRATOR')) {
            fs.appendFileSync('./memestrings.txt', `\n${message.content.substring(12)}`);
            message.reply(`added *${message.content.substring(12)}* as a meme string!`);
        } else {
            if (!message.member.roles.cache.has(role => role.name == "Server Booster")) return message.reply('you cannot add a meme string, unless you boost ;)');
            fs.appendFileSync('./memestrings.txt', `\n${message.content.substring(12)}`);
            message.reply(`added *${message.content.substring(12)}* as a meme string!`);
        }
    }
    if (message.content.toLowerCase()
        .includes('.botstatus')) {
        message.reply(new Discord.MessageEmbed()
            .setTitle('REALSV2 Status')
            .setFooter('Aero Softworks | discord.gg/ZjCmxPPy28')
            .addFields({
                name: "Server Count"
                , value: C.guilds.cache.size
                , inline: true
            }, {
                name: "Meme String Count"
                , value: fs.readFileSync('./memestrings.txt')
                    .toString()
                    .split('\n')
                    .length
                , inline: true
            }, {
                name: "Channels Posting To"
                , value: fs.readFileSync('./data.txt')
                    .toString()
                    .split(' ')
                    .length
                , inline: true
            }))
    }
    if (message.content.toLowerCase()
        .includes('.addchannel')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("you don't have enough permissions! <:uhohwtf:878659550507565056>");
        let file = fs.readFileSync('./data.txt');
        if (!message.content.includes(" ")) return message.reply(`this channel doesn't exist <:uhohwtf:878659550507565056>`);
        if (message.content.split(' ')[1].includes('<') || message.content.split(' ')[1].includes('#')) {
            if (!message.guild.channels.cache.has(message.content.split(' ')[1].split('<#')[1].split('>')[0])) return message.reply(`this channel doesn't exist <:uhohwtf:878659550507565056>`);
            if (file.includes(message.content.split(' ')[1].split('<#')[1].split('>')[0])) return message.reply(`this channel is already being uploaded to..`);
            fs.appendFileSync('./data.txt', `${message.content.split(' ')[1].split('<#')[1].split('>')[0]} `);
            message.reply(`uploading to <#${message.content.split(' ')[1].split('<#')[1].split('>')[0]}> now!`)
        } else {
            if (!message.guild.channels.cache.has(message.content.split(' ')[1])) return message.reply(`this channel doesn't exist <:uhohwtf:878659550507565056>`);
            if (file.includes(message.content.split(' ')[1])) return message.reply(`this channel is already being uploaded to..`);
            fs.appendFileSync('./data.txt', `${message.content.split(' ')[1]} `);
            message.reply(`uploading to <#${message.content.split(' ')[1]}> now!`)
        }
    }
})
C.login('');
SelfClient.on('message', async (message) => {
    if (message.content.toLowerCase()
        .includes('https://www.roblox.com/games/') || message.content.toLowerCase()
        .includes('https://web.roblox.com/games') || message.content.toLowerCase()
        .includes('https://roblox.com/games')) {
        if (await funcs.CheckIfDeleted(message.content.split('https://')[1].substring(21)
                .split('/')[0]) == true) return console.log('Deleted Game')
        fs.readFileSync('./data.txt')
            .toString()
            .split(' ')
            .forEach(id => {
                if (id == '') return console.log('Space')
                if (!C.channels.cache.get(id)) return fs.writeFileSync('./data.txt',fs.readFileSync('./data.txt').toString().split(id).join(''),"utf-8") || console.log(id)
                let placeid
                if (message.content.toLowerCase()
                    .includes('https://roblox.com/')) {
                    placeid = message.content.split('https://')[1].substring(17)
                        .split('/')[0]
                } else {
                    placeid = message.content.split('https://')[1].substring(21)
                        .split('/')[0]
                }
                C.channels.cache.get(id)
                    .send(new Discord.MessageEmbed()
                        .setTitle(fs.readFileSync('./memestrings.txt')
                            .toString()
                            .split('\n')[Math.floor(Math.random() * fs.readFileSync('./memestrings.txt')
                                .toString()
                                .split('\n')
                                .length)])
                        .setFooter('Aero Software | discord.gg/ZjCmxPPy28')
                        .setThumbnail('https://cdn.discordapp.com/attachments/867539575132127252/893666771645653022/P1ARHZjYX6GHAAAAAElFTkSuQmCC.png'), new MessageButton()
                        .setStyle('url')
                        .setURL(`https://www.roblox.com/games/${placeid}`)
                        .setLabel('🎮 Click Me To Join! 🎮'))
            })
    }
})
SelfClient.login("")
