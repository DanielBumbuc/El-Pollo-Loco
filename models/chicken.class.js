/**
 * Normal chicken enemy class with walking animation and death mechanics
 * Extends MoveableObject to support movement, collision detection, and health
 */
class Chicken extends MoveableObject {
    y = 330;
    width = 90;
    height = 90;
    lifepoints = 100;
    offset = {
        top: 10,
        bottom: 20,
        left: 10,
        right: 10
    }
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a normal chicken enemy with random positioning and speed
     * Loads walking and death animations, sets random spawn location and movement speed
     */
    constructor() {
        super().loadImg('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
         this.loadImages(this.IMAGES_DEAD);
        let levelWidth = 720 * 4;
        let spawnStart = levelWidth * 0.25;
        let spawnRange = levelWidth * 0.75;
        this.x = spawnStart + Math.random() * spawnRange;
        this.speed = 0.8 + Math.random() * 0.25;
    }

    /**
     * Starts chicken animation loops for movement, walking, and death animations
     * Creates intervals for leftward movement, walking animation, and death state checking
     */
    animateWalking() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 50);

    }

}