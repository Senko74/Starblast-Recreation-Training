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
            const playerList = this.playersArrayWithoutPlayer(player)
            player.sendOtherPlayersInfo(playerList)
        }
    }

    playersArrayWithoutPlayer(player)
    {
        const newArray = []
        for(const playerOfList of this.players)
        {
            if(player !== playerOfList)
            {
                newArray.push(
                {
                    player_name : player.player_name,
                    shipId : player.shipId,
                    typeShipId : player.typeShipId,
                    x : player.x,
                    y : player.y,
                    speedX : player.speedX,
                    speedY : player.speedY,
                    angle : player.angle,
                    angularVelocity : player.angularVelocity,
                    life : player.life
                })
            }
        }
        console.log(newArray)
        return newArray
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
                        break
                    case "left":
                        this.playerSpin(player, false, false)
                        break
                    case "stop_right":
                        this.playerSpin(player, true, true)
                        break
                    case "stop_left":
                        this.playerSpin(player, false, true)
                        break
                }
            }
        })
    }

    playerThrust(player, isThrusting)
    {
        if(isThrusting === true)
        {
            player.isThrusting = true

        }
        else
        {
            player.isThrusting = false
        }
    }

    playerSpin(player, isRight, isStop)
    {
        if(isRight === true && isStop === false)
        {
            player.angularVelocity = -5
        }
        else if(isRight === false && isStop === false)
        {
            player.angularVelocity = 5
        }
        else if(isRight === true && isStop === true)
        {
            player.angularVelocity =  0
        }
        else if(isRight === false && isStop === true)
        {
            player.angularVelocity =  0
        }
    }


}

module.exports = { game }