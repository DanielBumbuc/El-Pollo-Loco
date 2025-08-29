class StartGame extends DrawableObject {
    constructor() {
        super(); // ganz wichtig, damit DrawableObject initialisiert wird
        this.loadImg('img/9_intro_outro_screens/start/startscreen_1.png');
        this.x = 0;
        this.y = 0;
        this.width = 720;   // Größe anpassen an dein Canvas
        this.height = 480;
    }
}