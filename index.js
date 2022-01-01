const { Client, Intents, MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
const fs = require('fs');
const { check } = require('./src/functions/ban_check.js');
const request = require('request-promise');
const { upload } = require('./src/functions/upload');
const { SelfBotSend, Delete, Create } = require('./src/functions/message_call');
client.on('ready',()=>{
    console.log(`${client.user.tag} is online`);
});
async function UploadGame(){
    await upload().then(async(gameid)=>{
        await SelfBotSend(`:zap: _**Aero Softworks**_ :zap:\nhttps://www.roblox.com/games/${gameid}\nhttps://condo.aero-dev.xyz/redirects/redirect.php\nhttps://link-to.net/371783/${Math.random() * 1000 + "/dynamic/?r="+btoa(encodeURI(`https://www.roblox.com/games/${gameid}`))}`);
        let i = setInterval(async()=>{
            try{
                await SelfBotSend(`:zap: _**Aero Softworks**_ :zap:\nhttps://www.roblox.com/games/${gameid}\nhttps://condo.aero-dev.xyz/redirects/redirect.php\nhttps://link-to.net/371783/${Math.random() * 1000 + "/dynamic/?r="+btoa(encodeURI(`https://www.roblox.com/games/${gameid}`))}`);
            } catch(e) {
                console.log(e)
            }
        },2 * 60 * 1000)
        let l = setInterval(()=>{
            check(gameid,l,i).then(async(isBanned)=>{
                  if(isBanned == true){
                        clearInterval(l)
                        clearInterval(i)
                        await UploadGame();
                    }
            })
        },5000);
    });
}
(async()=>{
    await UploadGame();
})()
client.login();
