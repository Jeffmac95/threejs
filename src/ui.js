export default class UI {
    constructor() {
        this.screens = {
            menu: document.getElementById("menu"),
            gameover: document.getElementById("game-over")
        };
        this.playBtn = document.getElementById("play");
        this.restartBtn = document.getElementById("restart");
        this.finalScore = document.getElementById("final-score");
    }

    show(state) {
        for (const [name, el] of Object.entries(this.screens)) {
            el.classList.toggle("hidden", name !== state);
        }
    }
}