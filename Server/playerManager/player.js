
class Player
{
    constructor(socket, player_name, shipId)
    {
        this.socket = socket
        this.player_name = player_name
        this.shipId = shipId
        this.x
        this.y
        this.speedX
        this.speedY
        this.angle
        this.life
    }
}

module.exports = { Player }