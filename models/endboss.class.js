class Endboss extends MoveableObject {
    y = 235;
    width = 200;
    height = 200;
    lifepoints = 100;
    alert = false;
    hasAlerted = false; // Neu: Flag für einmaligen Angriff
    hasAttacked = false; // Neu: Flag, ob der Endboss bereits angegriffen hat
    lastAttackTime = 0; // Neu: Zeitstempel des letzten Angriffs
    attackSpeed = 230;
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
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
        this.x = 2500;
        this.speed = 1;

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.alertAnimationActive) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        setInterval(() => {
            if (this.alertAnimationActive) return; // Animation läuft bereits!
            const now = Date.now();
            if (this.isDead()) {
                return
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.alert) {
                    this.startAlertAnimation();
                if (this.hasAlerted && now - this.lastAttackTime > 3000) { // Mindestens 3 Sekunden seit letztem Angriff
                    this.startAttackAnimation();
                }
                this.lastAttackTime = now;
            }
        }, 2000);
    }

    attackPosition() {
        let attackInterval = null
        let lastPosX = this.x;
        this.x -= this.attackSpeed;
        if (attackInterval) { // Verhindert mehrere Intervalle
        clearInterval(attackInterval);
        }
        attackInterval = setInterval(() => {
            if (this.x < lastPosX) {
                this.x += this.attackSpeed;
            } else {
                clearInterval(attackInterval);
                attackInterval = null;
            }
        }, 300);
    }
}