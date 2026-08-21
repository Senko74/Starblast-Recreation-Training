const { getGameId } = require("./getGameId.js")
const { Player } = require("../playerManager/player.js")

class game
{
    constructor(gamesFromServer)
    {
        this.gameId = getGameId(gamesFromServer)
        this.gameState = "open"
        this.players = []
        this.tps = 30
        this.asteroids = []
        this.gemms = []
        this.mapSize = 20
        this.loopInterval = setInterval(() =>
        {
            this.gameLoop()
        }, this.tps)
    }

    gameLoop()
    {
        // console.log("tick")
        for(const player of this.players)
        {
            player.update()
            player.sendPlayerInfo()
        }
    }

    addNewPlayer(socket, name)
    {
        const playerShipId = this.getMaxShipId(this.players) + 1
        const newPlayer = new Player(socket, name, playerShipId)
        this.players.push(newPlayer)
        this.clientMessage(newPlayer)
    }

    getMaxShipId(playersList)
    {
        let maxPlayerShipId = 0
        for(const player of playersList)
        {
            if(player.shipId > maxPlayerShipId)
            {
                maxPlayerShipId = player.shipId
            }
        }
        return maxPlayerShipId
    }

    clientMessage(player)
    {
        const socket = player.socket
        socket.on("message", (message) =>
        {
            // console.log("game manager message", JSON.parse(message))
            let msg
            try
            {
                msg = JSON.parse(message)
            }
            catch(err)
            {
                return
            }
            if(msg.name)
            {
                switch(msg.name)
                {
                    case "thrust":
                }
            }
        })
    }

    playerThrust(player)
    {
        const angle = player.angle
    }

    
}

module.exports = { game }