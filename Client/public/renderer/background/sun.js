import * as THREE from "../../../../node_modules/three/build/three.module.js"

export class Sun
{
    constructor(posX, posY, scene)
    {
        this.posX = posX
        this.posY = posY
        this.scene = scene
        this.geometry 
        this.material
        this.mesh
    }

    spawn()
    {
        this.geometry = new THREE.SphereGeometry(10, 10, 10)
        this.material = new THREE.MeshBasicMaterial({color : 0xffffff})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}