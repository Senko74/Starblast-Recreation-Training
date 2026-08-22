import * as THREE from "../../../../node_modules/three/build/three.module.js"
import * as random from "../../../utils/getRandomInt.js"

export class stars
{
    constructor(mapSize, number, scene)
    {
        this.mapSize = mapSize
        this.number = number
        this.scene = scene
        this.minPos = 0
        this.maxPos = this.mapSize**2
        this.stars = []
    }

    buildStars()
    {
        const geometry = new THREE.SphereGeometry(0.3, 10, 10)
        const material = new THREE.MeshBasicMaterial({color : 0xffffff})
        for(let i = 0; i < this.number; i++)
        {
            const randX = random.getRandomInt(this.maxPos)
            const randY = random.getRandomInt(this.maxPos)
            const randZ = -10 - random.getRandomInt(150)
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(randX, randY, randZ)
            this.scene.add(mesh)
            this.stars.push(mesh)
        }
    }

}

