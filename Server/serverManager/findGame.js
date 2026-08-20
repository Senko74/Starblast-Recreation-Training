const { gameStates } = require("./gameStates")

function findGame(games)
{
    if(games.length <= 0)
    {
        return "no_games"
    }
    const gamesAvailable = gameStates(games).openGames
    return gamesAvailable[0]
}

module.exports = { findGame }