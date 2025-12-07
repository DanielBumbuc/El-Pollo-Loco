/**
 * Small chicken enemy class with walking animation and death mechanics
 * Extends MoveableObject to support movement, collision detection, and health
 */
class ChickenSmall extends MoveableObject {
    y = 355;
    width = 60;
    height = 60;
    lifepoints = 100;
    offset = {
        top: 10,
        bottom: 15,
        left: 10,
        right: 15
    }
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a small chicken enemy with random positioning and speed
     * Loads walking and death animations, sets random spawn location and movement speed
     */
    constructor() {
        super().loadImg('../img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        let levelWidth = 720 * 4;
        let spawnStart = levelWidth * 0.25;
        let spawnRange = levelWidth * 0.75;
        this.x = spawnStart + Math.random() * spawnRange;
        this.speed = 1.5 + Math.random() * 0.25;
    }

    /**
     * Starts chicken animation loops for movement and death state checking
     * Creates intervals for leftward movement, walking animation, and death checking
     */
    animateWalking() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
        setInterval(() => {
         this.checkDeadEnemie();
        }, 50);
    }

    /**
     * Checks if chicken is dead and plays death animation
     * Uses error handling to prevent animation crashes
     */
    checkDeadEnemie() {
           try {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                }
            } catch (error) {
                console.error('Error in ChickenSmall animation:', error);
            }
    }
}