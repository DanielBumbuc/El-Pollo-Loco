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
        this.world = world; // ← Sicherstellen, dass this.world definiert ist
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applayGravity();
        this.world.character.resetIdleCounter();
        setInterval(() => {
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            this.checkIsOnGround();
            this.checkBottleCollision();
        }, 40);
    }

    checkIsOnGround() {
        if (this.y > 360) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            this.isOnGround = true;
        }
    }

    checkBottleCollision() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.isColliding(endboss)) {
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
        });

        this.world.level.enemies.forEach((enemies) => {
            if (this.isColliding(enemies)) {
                enemies.hit(100);
                this.playSound('chicken');
                console.log(enemies.lifepoints);
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.speedY = 0;
                this.speedX = 0;
                setTimeout(() => {
                    this.y = 500;
                }, 100);
            }
        });
    }
}

