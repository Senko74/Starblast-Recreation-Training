const playButton = document.querySelector("#playButton")
const playerNameInput = document.querySelector("#playerName")
const playerName = playerNameInput.value
let socket

playButton.addEventListener("click", connectToServer)


function connectToServer()
{
    console.log("click")
    socket = new WebSocket(
    "ws://localhost:9000"
    )

    socket.addEventListener("message", (message) =>
    {
        let msg
        try
        {
            msg = JSON.parse(message.data)
        }
        catch(e)
        {
            return
        }
        if(msg.name)
        {
            switch(msg.name)
            {
                case "gameInfo":
                    joinGame(msg.data.gameInfo.gameId)
                    console.log("idddddddddd", msg.data.gameInfo.gameId)
            }
        }
    })

    socket.addEventListener("open", () =>
    {
        console.log("connection opened")
    })

    socket.addEventListener("close", () =>
    {
        console.log("connection closed")
    })

    socket.addEventListener("error", () =>
    {
        console.log("error")
    })
}

function joinGame(gameId)
{
    if(socket)
    {
        socket.send(JSON.stringify(
            {
                name : "join_game",
                data : 
                {
                    player_name : `${playerName}`,
                    gameId : gameId
                }

            }
        ))
    }
}

