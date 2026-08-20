function gameStates(gamesFromServer)
{
    let games = []
    let openGames = []
    let closedGames = []
    for(const game of gamesFromServer)
    {
        games.push(game)
        if(game.time >= game.maxTime)
        {
            closedGames.push(game)
        }
        else
        {
            openGames.push(game)
        }
    }
    return {
        games : games,
        openGames : openGames,
        closedGames : closedGames
    }
}

module.exports = { gameStates }