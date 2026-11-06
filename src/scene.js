import * as THREE from "three";

export default class Scene extends THREE.Scene {
    constructor() {
        super();
        this.loadBg();
    }

    loadBg() {
        const loader = new THREE.TextureLoader();

        loader.load("/bg.png", (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            this.background = texture;
        });
    }

    cleanUp() {
        if (this.background.dispose) this.background.dispose();
    }
}