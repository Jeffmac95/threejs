import * as THREE from "three";


export default class TargetManager {
    constructor(scene) {
        this.scene = scene;
        this.targets = [];
    }

    createTargets(geometry, material) {
        const target = new THREE.Mesh(geometry, material);

        target.rotation.y = Math.PI;
        target.position.set(0, 3, -8);

        this.scene.add(target);
        this.targets.push(target);
    }

    removeTarget(mesh) {
        this.scene.remove(mesh);
        this.targets = this.targets.filter(t => t !== mesh);
    }
}