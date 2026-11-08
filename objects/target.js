import * as THREE from "three";

export default class Target {
    constructor(radius, segments) {
        this.radius = radius;
        this.segments = segments;
        this.texture = this.createTexture();

        this.geometry = new THREE.CircleGeometry(radius, segments);
        this.material = new THREE.MeshStandardMaterial({ map: this.texture, side: THREE.DoubleSide });
    }

    createTexture() {
        const size = 512;
        const c = size / 2;

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d");

        // background disc
        ctx.beginPath();
        ctx.arc(c, c, c, 0, Math.PI * 2);
        ctx.fillStyle = "#40F5C4";
        ctx.fill();

        // red circle
        ctx.beginPath();
        ctx.arc(c, c, c * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }

    cleanUp() {
        this.material.dispose();
        this.geometry.dispose();
        this.texture.dispose();
    }
}