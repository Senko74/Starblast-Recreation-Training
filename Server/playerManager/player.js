const path = require("path")
const fs = require("fs")
class Player
{
    constructor(socket, player_name, shipId, callBack)
    {
        this.socket = socket
        this.player_name = player_name
        this.shipId = shipId
        this.typeShipId = 1
        this.shipData = 
        {
            shipMass : null, 
            shipAcceleration : null,
            maxSpeed : null
        }
        this.x = 200
        this.y = 200
        this.speedX = 0
        this.speedY = 0
        this.angle = 90 
        this.angularVelocity = 0
        this.life = 100
        this.initPlayer()
    }

    async initPlayer()
    {
        this.setShipData()
    }

    update()
    {
        this.updatePosition()
    }

    updatePosition()
    {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.angularVelocity
    }

    sendDataToClient()
    {
        this.sendPlayerInfo()
    }

    sendPlayerInfo()
    {
        this.socket.send(JSON.stringify(
            {
                name : "player_update",
                data : 
                {
                    x : this.x,
                    y : this.y,
                    speedX : this.speedX,
                    speedY : this.speedY,
                    angle : this.angle,
                    life : this.life
                    
                }
            }
        ))
    }

    async setShipData()
    {
        const filePath = path.join(__dirname, "../shipsManager/ships.json")
        const file = fs.readFileSync(filePath, "utf8")
        const shipsData = JSON.parse(file)
        for(const ship of shipsData)
        {
            if(ship.shipId === this.typeShipId)
            {
                this.shipData.shipMass = ship.shipMass
                this.shipData.shipAcceleration = ship.shipAcceleration
                this.shipData.maxSpeed = ship.maxSpeed
            }
        }
        console.log("shipdata : ", this.shipData)
    }
}

module.exports = { Player }