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
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applayGravity();
        if (this.bottleAmount <= 0) {
            // console.log(true);

        }
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
                console.log(this.world.statusbarEndboss);
                this.world.statusbarEndboss.setPercentage(endboss.lifepoints);
                endboss.hit();
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.speedY = 0;
                this.speedX = 0;
                setTimeout(() => {
                    this.y = 500;
                }, 10);
            }
        });
    }
}

