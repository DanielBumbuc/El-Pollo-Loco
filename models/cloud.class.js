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
        super();
        let cloudType = Math.random() < 0.5 ? '1.png' : '2.png';
        this.loadImg(`./img/5_background/layers/4_clouds/${cloudType}`);
        let levelWidth = 720 * 7;
        let spawnStart = 0;
        let spawnRange = levelWidth;
        this.x = spawnStart + Math.random() * spawnRange;
        this.speed = 0.2 + Math.random() * 0.25;
        this.animateWalking();
    }  

    /**
     * Starts continuous leftward movement animation for the cloud
     * Creates interval that moves cloud left at 60 FPS for smooth background motion
     */
    animateWalking() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}