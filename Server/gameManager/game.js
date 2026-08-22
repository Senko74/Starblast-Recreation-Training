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
                        this.playerThrust(player, true)
                        break
                    case "stop_thrust":
                        this.playerThrust(player, false)
                        break
                    case "right":
                        this.playerSpin(player, true, false)
                    case "left":
                        this.playerSpin(player, false, false)
                    case "stop_right":
                        this.playerSpin(player, false, true)
                    case "stop_left":
                        this.playerSpin(player, true, true)
                }
            }
        })
    }

    playerThrust(player, isThrusting)
    {
        if(isThrusting === true)
        {
            const angle = player.angle
            const radAngle = (angle*Math.PI)/180
            const speedX = Math.cos(radAngle)
            const speedY = Math.sin(radAngle)
            player.speedX = speedX
            player.speedY = speedY
            console.log("player thrust", speedX, speedY)
        }
        else
        {
            player.speedX = 0
            player.speedY = 0
            console.log("player stop thrust", player.speedX, player.speedX)
        }
    }

    playerSpin(player, isRight, isStop)
    {
        if(isRight === true && isStop === false)
        {
            player.angularVelocity += 1
        }
        else if(isRight === false && isStop === false)
        {
            player.angularVelocity -=  1
        }
        else if(isRight === true && isStop === true)
        {
            player.angularVelocity -=  1
        }
        else if(isRight === false && isStop === true)
        {
            player.angularVelocity +=  1
        }
    }

}

module.exports = { game }