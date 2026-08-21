const WebSockets = require("ws")
const { gamesVerification } = require("./serverManager/gameVerification.js")
const { game } = require("./gameManager/game.js")
const { findGame } = require("./serverManager/findGame.js")
const { findGameWithId } = require("./serverManager/findGameWithId.js")

let games = []

const port = 9000
const server = new WebSockets.WebSocketServer(
    {
        port : port
    }
)

server.on("connection", (socket) =>
{
    console.log("new connection")
    sendGame(socket)
    socket.on("message", (message) =>
    {
        let msg
        try
        {
            msg = JSON.parse(message)
        }
        catch(err)
        {
            return
        }
        // console.log(msg)
        if(msg.name)
        {
            switch(msg.name)
            {
                case "join_game":
                    joinAGame(socket, msg)


            }
        }
    })
})

function sendWelcome(socket, game)
{
    socket.send(JSON.stringify(
        {
            name : "welcome",
            data : 
            {
                gameId : game.gameId,
                size : game.mapSize
            }
        }
    ))
}

function joinAGame(socket, playerData)
{
    console.log(playerData.data)
    const player_name = `${playerData.data.player_name}`
    const gameId = playerData.data.gameId
    const gameIdx = findGameWithId(games, gameId)
    if(typeof(gameIdx) === "number")
    {
        games[gameIdx].addNewPlayer(socket, player_name)
        sendWelcome(socket, games[gameIdx])
    }
    
}

function sendError(socket, error)
{
    if(socket)
    {
        socket.send(JSON.stringify(
            {
                name : `${error}`
            }
        ))
    }
}

function sendGame(socket)
{
    const gameFoundData = findGame(games)
    if(socket)
    {

        socket.send(JSON.stringify(
            {
                name : "gameInfo",
                data : 
                {
                    gameId : gameFoundData.gameId
                }
            }
        ))
    }
}

setInterval(() =>
{
    const gamesState = gamesVerification(games)
    if(gamesState === 1)
    {
        const newGame = new game(games)
        console.log("new game : ", newGame)
        games.push(newGame)
    }
}, 1000)

