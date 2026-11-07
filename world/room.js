import * as THREE from "three";

export default class Room {
    constructor(scene) {
        this.scene = scene;

        const loader = new THREE.TextureLoader();
        this.floorTexture = loader.load("/metal.png");
        this.floorTexture.colorSpace = THREE.SRGBColorSpace;
        this.floorTexture.anisotropy = 8;
        this.floorGeometry = new THREE.PlaneGeometry(20, 20);
        this.floorMaterial = new THREE.MeshStandardMaterial({ map: this.floorTexture, roughness: 0.9 }); // #171B2D  222222 0x171B2D

        this.backWallGeometry = new THREE.BoxGeometry(20, 5, 0.5);
        this.leftWallGeometry = new THREE.BoxGeometry(0.5, 5, 20);
        this.rightWallGeometry = new THREE.BoxGeometry(0.5, 5, 20);
        this.wallMaterial = new THREE.MeshBasicMaterial({ color: 0x343C59 }); // #343C59 888888

        this.createFloor();
        this.createWalls();
    }

    createFloor() {
        const floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);

        // rotate to lie flat
        floor.rotation.x = -Math.PI / 2;

        this.scene.add(floor);
    }

    createWalls() {
        const backWall = new THREE.Mesh(this.backWallGeometry, this.wallMaterial);
        const leftWall = new THREE.Mesh(this.leftWallGeometry, this.wallMaterial);
        const rightWall = new THREE.Mesh(this.rightWallGeometry, this.wallMaterial);

        backWall.position.set(0, 2.5, -10);
        leftWall.position.set(-10, 2.5, 0);
        rightWall.position.set(10, 2.5, 0);
        
        this.scene.add(backWall, leftWall, rightWall);
    }

    cleanUp() {
        this.floorMaterial.dispose();
        this.floorGeometry.dispose();
        this.wallMaterial.dispose();
        this.backWallGeometry.dispose();
        this.leftWallGeometry.dispose();
        this.rightWallGeometry.dispose();
        this.floorTexture.dispose();
    }
}