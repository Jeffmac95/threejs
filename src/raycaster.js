import * as THREE from "three";

export default class Raycaster extends THREE.Raycaster {
    constructor(camera) {
        super();
        this.camera = camera;
        this.center = new THREE.Vector2(0, 0);
    }
    
    shootRay(objects) {
        this.setFromCamera(this.center, this.camera);

        return this.intersectObjects(objects, true);
    }
}