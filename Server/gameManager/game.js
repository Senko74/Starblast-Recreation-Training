const { getGameId } = require("./getGameId.js")
const { Player } = require("../playerManager/player.js")

class game
{
    constructor(gamesFromServer)
    {
        this.gameId = getGameId(gamesFromServer)
        this.gameState = "open"
        this.players = []
    }

    addNewPlayer(socket, name)
    {
        const playerShipId = getMaxShipId(this.players) + 1
        const newPlayer = new Player(socked, name, playerShipId)
    }

    getMaxShipId(playersList)
    {
        const maxPlayerShipId = 0
        for(player of playersList)
        {
            if(player.shipId > maxPlayerShipId)
            {
                maxPlayerShipId = player.shipId
            }
        }
        return maxPlayerShipId
    }

    
}

module.exports = { game }