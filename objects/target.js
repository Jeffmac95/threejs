import * as THREE from "three";

export default class Target {
    constructor(radius, segments) {
        this.radius = radius;
        this.segments = segments;
        this.geometry = new THREE.CircleGeometry(radius, segments);
        this.material = new THREE.MeshStandardMaterial({ color:0x40F5C4, side:THREE.DoubleSide });
    }

    cleanUp() {
        this.material.dispose();
        this.geometry.dispose();
    }
}