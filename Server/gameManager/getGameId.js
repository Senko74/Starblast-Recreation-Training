const { getRandomInt } = require("../../utils/getRandomInt.js")

function getGameId(games)
{
    let id = getRandomInt(10000)
    let verified = false
    let count = 0
    while(verified === false && count <= 100)
    {
        count += 1
        for(const game of games)
        {
            if(game.id === id)
            {
                id = getRandomInt(10000)
            }
        }
        verified = true
    }
    return id
}

module.exports = { getGameId }