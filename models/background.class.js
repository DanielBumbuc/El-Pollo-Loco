/**
 * Background class for creating scrollable background layers
 * Extends MoveableObject to support background movement and positioning
 */
class Background extends MoveableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 480 - this.height;

    /**
     * Creates a new background object with specified image and position
     * @param {string} imagePath - Path to the background image file
     * @param {number} x - Horizontal position of the background
     */
    constructor(imagePath, x) {
        super();
        this.loadImg(imagePath);
        this.x = x;
    }

}