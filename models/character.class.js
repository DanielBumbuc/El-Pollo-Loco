/**
 * Main character class representing the player-controlled character Pepe
 * Extends MoveableObject with movement, animation, and interaction capabilities
 */
class Character extends MoveableObject {
    world;
    y = 120;
    otherDirection = false;
    jumpFrame = 0;
    isJumping = false;
    idleCounter = 0;
    isIdleAnimating = false;
    idleThreshold = 50; // 300 frames = 5000ms
    offset = {
        top: 130,
        bottom: 12,
        left: 50,
        right: 50
    }

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Creates the main character with all animation images and starts animation loops
     * Initializes character with gravity, movement speed, and animation cycles
     */
    constructor() {
        super().loadImg('./img/2_character_pepe/3_jump/J-31.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applayGravity();
        this.speed = 4;
        this.animate();
    }

    /**
     * Starts character animation loops for movement and visual state updates
     * Sets up two intervals: one for movement detection, one for animation updates
     */
    animate() {
        setInterval(() => {
            this.setMovementApplication();
        }, 1000 / 60)

        setInterval(() => {
            this.setAnimation();
        }, 150);
    }

    /**
     * Manages idle animation states based on inactivity duration
     * Plays short idle animation initially, then long idle animation after threshold
     */
    checkIdleAnimation() {
        this.idleCounter++;
        if (this.idleCounter >= 0) {
            this.playAnimation(this.IMAGES_IDLE);
            if (this.idleCounter >= this.idleThreshold) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        } else {
            this.loadImg('./img/2_character_pepe/3_jump/J-31.png');
        }
    }

    /**
     * Handles keyboard input for character movement and actions
     * Processes right/left movement, jumping, and updates camera position
     */
    setMovementApplication() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }
        this.setCamera();
    }

    /**
     * Determines and plays appropriate character animation based on current state
     * Handles dead, hurt, jumping, walking, and idle animation states
     */
    setAnimation() {
        if (this.isDead()) {
            return;
        } else if (this.isHurt() && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_HURT);
            this.resetIdleCounter();
        } else if (this.isAboveGround()) {
            this.resetIdleCounter();
            return;
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetIdleCounter();
            } else {
                this.checkIdleAnimation();
            }
        }
    }

    /**
     * Activates idle animation state
     * Sets flag to indicate idle animation is currently playing
     */
    startIdleAnimation() {
        this.isIdleAnimating = true;
    }

    /**
     * Resets idle counter and animation state
     * Called when character becomes active to stop idle animations
     */
    resetIdleCounter() {
        this.idleCounter = 0;
        this.isIdleAnimating = false;
    }

    /**
     * Handles character jumping on enemies to defeat them
     * Checks collision with enemies, deals damage, plays sound, and bounces character
     */
    jumpOnEnemy() {
        this.world.level.enemies.forEach((enemies) => {
            if (this.isColliding(enemies)) {
                enemies.hit(100);
                this.playSound('chicken');
                this.jump();
            }
        });
        this.resetIdleCounter();
        this.speedY = 15;
    }
}