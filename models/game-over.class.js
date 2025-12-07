/**
 * Game Over screen class for displaying the game over screen when player loses
 * Extends DrawableObject to show defeat screen when character dies
 */
class GameOver extends DrawableObject {
    img = new Image();
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Creates a new game over screen and loads the appropriate image
     */
    constructor() {
        super();
        this.loadGameOverScreen();
    }

    /**
     * Loads the game over screen image
     * Sets up the "Game Over" display image for when the player loses
     */
    loadGameOverScreen() {
        this.loadImg('img/9_intro_outro_screens/game_over/game over.png');
    }
}