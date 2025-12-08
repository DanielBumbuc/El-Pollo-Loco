/**
 * Victory screen class for displaying the game won screen
 * Extends DrawableObject to show victory screen when player wins
 */
class YouWon extends DrawableObject {
    img = new Image();
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Creates a new victory screen and loads the appropriate image
     */
    constructor() {
        super();
        this.loadYouWonScreen();
    }

    /**
     * Loads the victory screen image and handles restart button visibility
     * Sets up the "You Won" display image
     */
    loadYouWonScreen() {
        let restartBtn = document.getElementById('restartButton');
        this.loadImg('./img/You won, you lost/You won A.png');
    }
}
