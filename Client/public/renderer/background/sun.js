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
        this.geometry = new THREE.SphereGeometry(5, 10, 10)
        this.loader = new THREE.TextureLoader()
        this.texture = this.loader.load("./assets/sun.jpg")
        this.material = new THREE.MeshBasicMaterial({map : this.texture})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.posX, this.posY, -30)
        this.scene.add(this.mesh)
    }

    rotate()
    {
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.01
        this.mesh.rotation.z += 0.01
    }
}