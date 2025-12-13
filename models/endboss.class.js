/**
 * Endboss class representing the final boss enemy with complex AI behavior
 * Extends MoveableObject with alert, attack, and advanced animation systems
 */
class Endboss extends MoveableObject {
    y = 235;
    width = 200;
    height = 200;
    otherDirection = false;
    lifepoints = 100;
    alert = false;
    hasAlerted = false;
    attackLeft = false;
    attackRight = false;
    isAttacking = false;
    attackInterval = null;
    hasAttacked = false;
    lastAttackTime = 0;
    attackSpeed = 100;
    offset = {
        top: 85,
        bottom: 40,
        left: 45,
        right: 45
    }

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates the endboss with all animation states and positioning
     * Loads walking, alert, attack, hurt, and death animations
     * Sets initial position and movement speed
     */
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.speed = 2.5;
    }

    /**
     * Starts all endboss animation loops including movement, walking, and state animations
     * Creates intervals for movement direction updates, walking animation, and state checking
     */
    animate() {
        setInterval(() => {
            this.setMoveDirection();
        }, 1000 / 60);

        setInterval(() => {
            if (this.alertAnimationActive) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        setInterval(() => {
            this.setAnimation();
        }, 150);

    }

    /**
     * Controls endboss movement direction based on current animation state
     * Handles leftward and rightward movement while respecting animation locks
     */
    setMoveDirection() {
        if (!this.alertAnimationActive && !this.attackAnimationActive && !this.isAttacking && !this.isDead() && !this.isHurt()) {
            if (!this.otherDirection) {
                this.moveLeft();
            } else {
                this.x += this.speed;
            }
        }
    }

    /**
     * Determines and plays appropriate endboss animation based on current state
     * Handles dead, hurt, alert, and attack animation states with timing controls
     */
    setAnimation() {
        const now = Date.now();
        if (this.isDead()) {
            return
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.alert) {
            if (this.alertAnimationActive) return;
            this.startAlertAnimation();
            if (this.hasAlerted && now - this.lastAttackTime > 200) {
                this.startAttackAnimation();
            }
            this.lastAttackTime = now;
        }
    }

    /**
     * Initiates endboss attack sequence with position tracking
     * Sets up attack state and starts attack interval for position-based attacks
     */
    /**
     * Initiates attack sequence and manages attack positioning
     * @param {number} startPosX - Starting position for attack return calculation
     * Prevents multiple simultaneous attacks and sets up attack direction
     */
    attackPosition() {
        let startPosX = this.x;
        if (this.isAttacking) {
            return;
        }
        this.isAttacking = true;
        this.checkAttackDirection();
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
        this.attackInterval = setInterval(() => {
            this.startAttack(startPosX);
        }, 300);
    }

    /**
     * Determines attack direction and applies movement based on attack flags
     * Handles leftward and rightward attack movements with speed modifier
     */
    /**
     * Determines attack direction based on character position and moves endboss accordingly
     * Moves left or right based on attack flags and resets directional flags
     */
    checkAttackDirection() {
        if (this.attackLeft) {
            this.x -= this.attackSpeed;
            this.attackLeft = false;
        }

        if (this.attackRight) {
            this.x += this.attackSpeed;
            this.attackRight = false;
        }
    }

    /**
     * Executes attack movement and handles return to starting position
     * @param {number} startPosX - The original x position before attack
     * Returns endboss to starting position after attack completion
     */
    /**
     * Executes attack movement and return to starting position
     * @param {number} startPosX - Original position to return to after attack
     * Manages attack movement and cleanup when attack is complete
     */
    startAttack(startPosX) {
        if (this.x < startPosX) {
            this.x += this.attackSpeed;
        } else {
            this.x = startPosX;
            clearInterval(this.attackInterval);
            this.attackInterval = null;
            this.isAttacking = false;
        }
    }
}