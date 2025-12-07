/**
 * Start game screen class for displaying the initial game screen
 * Extends DrawableObject to show the start screen before gameplay begins
 */
class StartGame extends DrawableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Creates a new start game screen with the start screen image
     */
    constructor() {
        super();
        this.loadImg('img/9_intro_outro_screens/start/startscreen_1.png');
    }

    /**
     * Draws the start screen on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        super.draw(ctx);
    }
}