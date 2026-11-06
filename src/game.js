import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

import Scene from "./scene.js";
import Camera from "./camera.js";
import Renderer from "./renderer.js";
import Room from "../world/room.js";
import Weapon from "../objects/weapon.js";
import Target from "../objects/target.js";
import Raycaster from "./raycaster.js";
import UI from "./ui.js";
import TargetManager from "./targetManager.js";

export default class Game {
    constructor() {
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        document.body.appendChild(this.renderer.domElement);

        this.room = new Room(this.scene);
        this.target = new Target(1, 8);
        this.targetManager = new TargetManager(this.scene, this.target.geometry, this.target.material, this.target.radius);
        this.raycaster = new Raycaster(this.camera);
        this.weapon = new Weapon(this.camera, this.raycaster);
        this.ui = new UI();
        this.score = 0;

        this.state = "menu";

        this.controls = new PointerLockControls(this.camera, this.renderer.domElement);

        this.light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    }

    start() {
        this.camera.add(this.weapon);
        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
        });

        this.ui.playBtn.addEventListener("click", () => this.play());
        this.ui.restartBtn.addEventListener("click", () => this.play());
        this.controls.addEventListener("unlock", () => {
            if (this.state === "playing") this.setState("menu");
        });

        this.targetManager.fillTargets();

        this.handleInput();
    }

    end() {
        this.room.cleanUp();
        this.weapon.cleanUp();
        this.target.cleanUp();
        this.targetManager.cleanUp();
        this.scene.cleanUp();
    }

    setState(state) {
        this.state = state;
        this.ui.show(state);
    }

    play() {
        this.score = 0;
        this.setState("playing");
        this.controls.lock();
    }

    handleInput() {
        window.addEventListener("mousedown", () => this.shoot());
        window.addEventListener("keydown", (e) => {if (e.key === ' ') e.preventDefault();});
    }

    shoot() {
        if (this.state !== "playing") return;
        if (!this.controls.isLocked) return;

        const hit = this.weapon.shoot(this.targetManager.targets);

        if (hit) {
            this.targetManager.removeTarget(hit.object);
            this.targetManager.fillTargets();
            this.score++;
        }
    }
}
