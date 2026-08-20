function gamesVerification(games)
{
    // 0 -> Nothing to do, 1 -> CreateGame, 2 remove game
    if(games.length === 0)
    {
        return 1
    }
    for(game of games)
    {
        if(game.players >= games.maxPlayers)
        {
            return 1
        }
    }
    return 0
}

module.exports = { gamesVerification }