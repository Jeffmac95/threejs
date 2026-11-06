import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class Weapon extends THREE.Group {
    constructor(camera, raycaster) {
        super();
        this.camera = camera;
        this.raycaster = raycaster;
        this.material = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.35 });

        this.load();
    }

    shoot(targets) {
        const hits = this.raycaster.shootRay(targets);
        return hits.length > 0 ? hits[0] : null;
    }

    load() {
        const loader = new GLTFLoader();
        loader.load("/weapon.glb", (gltf) => {
            const model = gltf.scene;
            
            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = this.material;
                }
            });
    
            model.scale.setScalar(0.5);
            model.position.set(0.6, -0.6, -0.7);
            model.rotation.y = THREE.MathUtils.degToRad(90);

            this.add(model);
        }, undefined,
            (error) => {
                console.error("Error loading model:", error);
            }
        )
    }

    cleanUp() {
        this.material.dispose();
    }
}