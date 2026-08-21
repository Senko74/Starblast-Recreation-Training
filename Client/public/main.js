
import * as Renderer from "./renderer/renderGame.js"
const title = document.querySelector("#title")
const playButton = document.querySelector("#playButton")
const playerNameInput = document.querySelector("#playerName")
const canvas = document.querySelector("#renderCanvas")

let socket
let render

playButton.addEventListener("click", connectToServer)
addEventListener("keydown", (event) =>
{
    if(event.key === "ArrowUp")
    {
        console.log("arrow up")
        sendThrust()
    }
})



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
                    joinGame(msg.data.gameId)
                    break
                case "welcome":
                    startRendering(msg.data)
                    break
                case "player_update":
                    render.serverMessage(msg.data)
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
        const playerName = playerNameInput.value
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

function startRendering(gameDataSent)
{
    console.log("start rendering")
    title.style.display = "none"
    playButton.style.display = "none"
    playerNameInput.style.display = "none"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    render = new Renderer.GameRenderer(gameDataSent)
}

function sendThrust()
{
    socket.send(JSON.stringify(
        {
            name : "thrust"
        }
    ))
}

