const request = require('request-promise');
module.exports = {
    CheckIfDeleted: async function (id) {
        let { UniverseId } = await request({uri: `https://api.roblox.com/universes/get-universe-containing-place?placeid=${id}`,json:true})
        let Place = await request({uri: `https://games.roblox.com/v1/games?universeIds=${UniverseId}`,json: true})
        let Player = await request({uri:`https://users.roblox.com/v1/users/${Place.data[0].creator.id}`,json:true})
        if(Place.data[0].name.includes("[ Content Deleted ]")){
            if(Player.isBanned) return true
            return false
        }
    }
};
