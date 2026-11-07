export default class UI {
    constructor() {
        this.screens = {
            menu: document.getElementById("menu"),
            paused: document.getElementById("paused"),
            gameover: document.getElementById("game-over")
        };
        this.playBtn = document.getElementById("play");
        this.restartBtn = document.getElementById("restart");
        this.finalScore = document.getElementById("final-score");
        this.timeEl = document.getElementById("time");
        this.hud = document.getElementById("hud");
        this.resumeBtn = document.getElementById("resume");
        this.quitBtn = document.getElementById("quit");
    }

    show(state) {
        for (const [name, el] of Object.entries(this.screens)) {
            el.classList.toggle("hidden", name !== state);
        }
    }

    setTime(seconds) {
        this.timeEl.textContent = seconds;
    }
}