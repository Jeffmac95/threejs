import * as THREE from "three";


const BOUNDS = {
    x: { min: -8, max: 8 },
    y: { min: 1, max: 4 },
    z: { min: -9, max: -6 }
};

export default class TargetManager {
    constructor(scene, geometry, material, radius) {
        this.scene = scene;
        this.geometry = geometry;
        this.material = material;
        this.radius = radius;
        this.targets = [];
        this.maxTargets = 3;
    }

    createTargets() {
        const pos = this.getSpawnPosition();
        if (!pos) return;

        const target = new THREE.Mesh(this.geometry, this.material);

        target.rotation.y = Math.PI;

        target.position.copy(pos);
        this.scene.add(target);
        this.targets.push(target);
    }

    removeTarget(mesh) {
        this.scene.remove(mesh);
        this.targets = this.targets.filter(t => t !== mesh);
        console.log(this.targets.length);
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomPosition() {
        return new THREE.Vector3(
            this.randomRange(BOUNDS.x.min, BOUNDS.x.max),
            this.randomRange(BOUNDS.y.min, BOUNDS.y.max),
            this.randomRange(BOUNDS.z.min, BOUNDS.z.max)
        );
    }

    getSpawnPosition() {
        const minDistance = this.radius * 2 + 0.5;

        for (let attempt = 0; attempt < 20; attempt++) {
            const pos = this.getRandomPosition();
            const overlaps = this.targets.some(t => t.position.distanceTo(pos) < minDistance);
            if (!overlaps) return pos;
        }

        return null;
    }

    fillTargets() {
        while (this.targets.length < this.maxTargets) {
            const before = this.targets.length;
            this.createTargets();
            if (this.targets.length === before) break;
        }
    }

    cleanUp() {
        this.material.dispose();
        this.geometry.dispose();
    }
}