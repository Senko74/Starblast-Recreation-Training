import * as THREE from "../../../node_modules/three/build/three.module.js"
import * as SunMesh from "./background/sun.js"

export class GameRenderer
{
    constructor(gameData)
    {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.scene = new THREE.Scene()
        this.gameData = gameData
        this.renderer = new THREE.WebGLRenderer(
            {
                canvas : document.querySelector("#renderCanvas")
            }
        )
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        window.addEventListener("resize", () =>
        {
            console.log("resize")
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    initRender()
    {
        this.backGround()
        this.camera.lookAt(this.sun)
        this.rendering()
    }

    backGround()
    {
        this.sun = new SunMesh.Sun((this.gameData.size**2)/2, (this.gameData.size**2)/2, this.scene)
        this.scene.add(this.sun)
    }

    rendering()
    {
        window.requestAnimationFrame(rendering)
        this.renderer.render(this.scene, this.camera)
    }

    serverMessage(message)
    {

    }
}
