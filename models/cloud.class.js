/**
 * Cloud class for creating moving background clouds
 * Extends MoveableObject to support automatic leftward movement across the sky
 */
class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 200;

    /**
     * Creates a cloud with random starting position and automatic leftward movement
     * Loads cloud image and sets random horizontal spawn position
     */
    constructor() {
        super().loadImg('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.moveLeft();
    }  
}