function findGameWithId(gamesFromServer, gameId)
{
    console.log(gamesFromServer)
    console.log(gameId)
    for(const game of gamesFromServer)
    {
        if(gameId === game.gameId)
        {
            switch(game.gameState)
            {
                case "open":
                    return gamesFromServer.indexOf(game)
                case "closed":
                    return "game_closed"
            }
        }
    }
    return "game_not_found"
}

module.exports = { findGameWithId }