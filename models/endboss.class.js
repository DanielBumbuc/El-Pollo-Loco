class Endboss extends MoveableObject {
    y = 235;
    width = 200;
    height = 200;
    lifepoints = 100;
    alert = false;
    hasAttacked = false; // Neu: Flag für einmaligen Angriff
    lastAttackTime = 0; // Neu: Zeitstempel des letzten Angriffs
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
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        setInterval(() => {
            const now = Date.now();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.alert && !this.hasAttacked && now - this.lastAttackTime > 5000) {
                this.playAnimation(this.IMAGES_ALERT);
                this.hasAttacked = true; // Angriff nur einmal zulassen
                this.lastAttackTime = now;
                // Attack-Animation einmalig abspielen  
                let attackIndex = 0;
                let attackAnim = setInterval(() => {
                    if (attackIndex < this.IMAGES_ATTACK.length) {
                        this.img = this.imageCache[this.IMAGES_ATTACK[attackIndex]];
                        attackIndex++;
                    } else {
                        clearInterval(attackAnim); // Animation stoppen
                        this.hasAttacked = false; // Angriff zurücksetzen
                    }

                }, 100); // Geschwindigkeit der Attack-Animation
            }
        }, 50);
    }
}