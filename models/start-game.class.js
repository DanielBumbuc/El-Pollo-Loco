class StartGame extends DrawableObject {

    // x = 0;
    // y = 0;
    // width = 720;   // Größe anpassen an dein Canvas
    // height = 480;

    // constructor() {
    //     super(); // ganz wichtig, damit DrawableObject initialisiert wird
    //     this.loadImg('img/9_intro_outro_screens/start/startscreen_1.png');
    //     this.getPlayButton();
    // }

    // getPlayButton() {
    //     this.loadImg('img/icons8-spielen-64.png');
    //     this.width = 24;
    //     this.height = 24;
    // }

    background = new DrawableObject();
    playButton = new DrawableObject();

    constructor() {
        super();
        this.loadStartScreen();
        this.loadPlayButton();
        this.uiElements = [this.background, this.playButton];
    }

    loadStartScreen() {
        this.background.loadImg('img/9_intro_outro_screens/start/startscreen_1.png');
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 720;
        this.background.height = 480;
    }

    loadPlayButton() {
        this.playButton.loadImg('img/icons8-spielen-64.png');
        this.playButton.x = 300;
        this.playButton.y = 350;
        this.playButton.width = 64;
        this.playButton.height = 64;
    }

    draw(ctx) {
        this.uiElements.forEach(obj => obj.draw(ctx));
    }

    checkClick(x, y) {
        let interactive = [this.playButton]; 
        let clicked = interactive.find(obj =>
            x >= obj.x && x <= obj.x + obj.width &&
            y >= obj.y && y <= obj.y + obj.height
        );
        return clicked;
    }
}