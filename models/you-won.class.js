class YouWon extends DrawableObject {
    img = new Image();
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadYouWonScreen();
    }

    loadYouWonScreen() {
        this.loadImg('../img/You won, you lost/You won A.png');
    }
}
