import * as THREE from "../../../../node_modules/three/build/three.module.js"
// import * as GLTFLoader from "../../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class ship
{
    constructor(posX, posY, scene, color)
    {
        this.posX = posX
        this.posY = posY
        this.scene = scene
        this.color = color
    }

    spawn()
    {
        this.geometry = new THREE.BoxGeometry(5,2,2)
        this.material = new THREE.MeshBasicMaterial({color : this.color})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.posX, this.posY, 0)
        this.scene.add(this.mesh)
    }

    updatePosition(posX, posY)
    {
        this.mesh.position.set(posX, posY, 0)
    }

    updateRotation(radAngle)
    {
        this.mesh.rotation.z = radAngle
    }
}