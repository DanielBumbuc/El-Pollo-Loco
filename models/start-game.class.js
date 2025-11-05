class StartGame extends DrawableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadImg('img/9_intro_outro_screens/start/startscreen_1.png');
    }

    draw(ctx) {
        super.draw(ctx);
    }
}