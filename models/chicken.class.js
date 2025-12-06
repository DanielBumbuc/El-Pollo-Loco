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
        // this.x = 450 + Math.random() * 500;
        let levelWidth = 720 * 4; // 4 Background-Segmente
        let spawnStart = levelWidth * 0.25; // 25% vom Level-Anfang  
        let spawnRange = levelWidth * 0.75; // 75% der Level-Breite
        this.x = spawnStart + Math.random() * spawnRange;
        this.speed = 0.8 + Math.random() * 0.25;

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