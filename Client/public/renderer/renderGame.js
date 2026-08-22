import * as THREE from "../../../node_modules/three/build/three.module.js"
import * as SunMesh from "./background/sun.js"
import * as StarsMesh from "./background/stars.js"
import * as ShipMesh from "./ship/ship.js"

export class GameRenderer
{
    constructor(gameData)
    {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.scene = new THREE.Scene()
        this.gameData = gameData
        this.mapSize = gameData.size

        //Meshs
        this.ship 
        this.sun
        this.stars
        //Meshs
        this.otherPlayers = []
        this.renderer = new THREE.WebGLRenderer(
            {
                canvas : document.querySelector("#renderCanvas")
            }
        )
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        window.addEventListener("resize", () =>
        {
            console.log("resize")
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
        this.initRender()
    }

    initRender()
    {
        this.initShip()
        this.backGround()
        this.rendering()
    }

    initShip()
    {
        this.ship = new ShipMesh.ship(0,0,this.scene, 0xff0000)
        this.ship.spawn()
    }

    backGround()
    {
        this.sun = new SunMesh.Sun((this.mapSize**2)/2, (this.mapSize**2)/2, this.scene)
        this.sun.spawn()
        this.stars = new StarsMesh.stars(this.mapSize, 3000, this.scene)
        this.stars.buildStars()
        console.log("sun", this.sun.mesh.position)
        console.log("camera", this.camera.position)
    }

    rendering()
    {
        window.requestAnimationFrame(() => 
            {
                this.rendering()
            })
        this.sun.rotate()
        this.renderer.render(this.scene, this.camera)
        this.camera.position.set(this.ship.mesh.position.x, this.ship.mesh.position.y, 30)
    }

    serverMessage(message)
    {
        let msg
        try
        {
            msg = JSON.parse(message.data)
        }
        catch(err)
        {
            return
        }
        if(msg.name)
        {
            if(msg.name !== "player_update")
            {
                console.log(msg)
            }
            switch(msg.name)
            {
                case "player_update":
                   this.updatePlayerPosition(msg.data)
                   this.updatePlayerAngle(msg.data)
                   break
                case "other_players":
                    this.updateOtherPlayers(msg.players_list)
                    break
            }
        }
    }

    updateOtherPlayers(playerList)
    {
        for(const player of playerList)
        {
            const ship = new ShipMesh.ship(player.x , player.y ,this.scene, 0x0000ff)
            ship.spawn()
        }
    }

    updatePlayerPosition(data)
    {
        const x = data.x
        const y = data.y
        this.ship.updatePosition(x, y)
    }

    updatePlayerAngle(data)
    {
        const radAngle = (data.angle*Math.PI)/180
        this.ship.updateRotation(radAngle)
    }
}
