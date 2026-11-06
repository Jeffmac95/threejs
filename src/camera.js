import * as THREE from "three";

export default class Camera extends THREE.PerspectiveCamera {
    constructor() {
        const fov = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 800;

        super(fov, aspect, near, far);

        this.position.set(0, 2, 5);
    }
}