
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
    if(event.key === "ArrowUp" && !event.repeat)
    {
        sendStartThrust()
    }
    else if(event.key === "ArrowRight" && !event.repeat)
    {
        sendStartSpinRight()
    }
    else if(event.key === "ArrowLeft" && !event.repeat)
    {
        sendStartSpinLeft()
    }
})

addEventListener("keyup", (event) =>
{
    if(event.key === "ArrowUp")
    {
        sendStopThrust()
    }
    else if(event.key === "ArrowRight" && !event.repeat)
    {
        sendStopSpinRight()
    }
    else if(event.key === "ArrowLeft" && !event.repeat)
    {
        sendStopSpinLeft()
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
        if(render)
        {
            render.serverMessage(message)
        }
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
                    console.log(msg)
                    break

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

function sendStartThrust()
{
    console.log("start thrust")
    socket.send(JSON.stringify(
        {
            name : "thrust"
        }
    ))
}

function sendStopThrust()
{
    console.log("stop thrust")
    socket.send(JSON.stringify(
        {
            name : "stop_thrust"
        }
    ))
}

function sendStartSpinRight()
{
    socket.send(JSON.stringify(
        {
            name : "right"
        }
    ))
}

function sendStartSpinLeft()
{
    socket.send(JSON.stringify(
        {
            name : "left"
        }
    )) 
}

function sendStopSpinRight()
{
    socket.send(JSON.stringify(
        {
            name : "stop_right"
        }
    )) 
}

function sendStopSpinLeft()
{
    socket.send(JSON.stringify(
        {
            name : "stop_left"
        }
    )) 
}

