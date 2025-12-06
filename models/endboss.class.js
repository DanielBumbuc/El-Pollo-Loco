class Endboss extends MoveableObject {
    y = 235;
    width = 200;
    height = 200;
    otherDirection = false;
    lifepoints = 100;
    alert = false;
    hasAlerted = false; // Neu: Flag für einmaligen Angriff
    attackLeft = false;
    attackRight = false;
    isAttacking = false;
    attackInterval = null;
    hasAttacked = false; // Neu: Flag, ob der Endboss bereits angegriffen hat
    lastAttackTime = 0; // Neu: Zeitstempel des letzten Angriffs
    attackSpeed = 100;
    offset = {
        top: 85,
        bottom: 40,
        left: 45,
        right: 45
    }

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

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

    setMoveDirection() {
        if (!this.alertAnimationActive && !this.attackAnimationActive && !this.isAttacking && !this.isDead() && !this.isHurt()) {
            if (!this.otherDirection) {
                this.moveLeft();
            } else {
                this.x += this.speed;
            }
        }
    }

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