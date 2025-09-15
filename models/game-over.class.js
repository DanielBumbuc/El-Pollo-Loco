class GameOver extends DrawableObject {
    img = new Image();
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadGameOverScreen();
    }

    loadGameOverScreen() {
        this.loadImg('img/9_intro_outro_screens/game_over/game over.png');
    }
}