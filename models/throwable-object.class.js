/**
 * Throwable object class for bottles that can be thrown at enemies
 * Extends MoveableObject with physics, collision detection, and splash effects
 */
class ThrowableObject extends MoveableObject {
    world;
    isOnGround = false;

    IMAGES_BOTTLE_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates a throwable bottle with specified position and velocity
     * @param {number} x - Starting horizontal position
     * @param {number} y - Starting vertical position  
     * @param {number} speedX - Horizontal throwing speed
     * Loads rotation and splash animations and starts throwing physics
     */
    constructor(x, y, speedX) {
        super();
        this.loadImg('../img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATE)
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x + 40;
        this.y = y + 40;
        this.speedX = speedX;
        this.height = 40;
        this.width = 40;
        this.world = world;
        this.throw();
    }

    /**
     * Starts the bottle throwing physics and animation
     * Applies gravity, horizontal movement, rotation animation, and collision detection
     */
    throw() {
        this.speedY = 20;
        this.applayGravity();
        this.world.character.resetIdleCounter();
        setInterval(() => {
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            this.checkIsOnGround();
            this.checkBottleCollision();
        }, 40);
    }

    /**
     * Checks if the bottle has hit the ground and triggers splash animation
     * Sets ground collision flag when bottle reaches ground level (y > 360)
     */
    checkIsOnGround() {
        if (this.y > 360) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            this.isOnGround = true;
        }
    }

    /**
     * Checks for collisions between bottle and enemies or endboss
     * Handles collision responses for both endboss and regular enemies
     */
    checkBottleCollision() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.isColliding(endboss)) {
                this.setCollisionEndboss(endboss);
            }
        });

        this.world.level.enemies.forEach((enemies) => {
            if (this.isColliding(enemies)) {
                this.setCollisionEnemy(enemies);
            }
        });
    }

    /**
     * Handles collision between bottle and endboss
     * @param {Endboss} endboss - The endboss that was hit by the bottle
     * Damages endboss, updates health bar, plays sound, and stops bottle movement
     */
    setCollisionEndboss(endboss) {
        this.world.statusbarEndboss.setPercentage(endboss.lifepoints);
        endboss.hit(15);
        this.playSound('endboss');
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        this.speedX = 0;
        setTimeout(() => {
            this.y = 500;
        }, 10);
    }

    /**
     * Handles collision between bottle and regular enemies  
     * @param {MoveableObject} enemies - The enemy that was hit by the bottle
     * Deals fatal damage, plays sound, removes dead enemies, and stops bottle
     */
    setCollisionEnemy(enemies) {
        enemies.hit(100);
        this.playSound('chicken');
        console.log(enemies.lifepoints);
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        this.speedX = 0;
        setTimeout(() => {
            this.world.removeDeadEnemies();
            this.y = 500;
        }, 100);
    }
}