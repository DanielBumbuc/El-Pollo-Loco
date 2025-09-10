class Chicken extends MoveableObject {
    y = 370;
    width = 50;
    height = 50;
    lifepoints = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImg('../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
         this.loadImages(this.IMAGES_DEAD);
        this.x = 450 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

    }

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