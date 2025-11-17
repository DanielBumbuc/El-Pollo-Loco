class ChickenSmall extends MoveableObject {
    y = 355;
    width = 60;
    height = 60;
    lifepoints = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImg('../img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 350 + Math.random() * 500;
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
    try {
        if (this.isDead()) {
            // Nur beim ersten Tod loggen
            if (!this.hasLoggedDeath) {
                console.log('ChickenSmall DIED:', {
                    lifepoints: this.lifepoints,
                    isDead: this.isDead(),
                    deadProperty: this.dead,
                    timestamp: new Date().toLocaleTimeString()
                });
                this.hasLoggedDeath = true;
            }
            
            this.playAnimation(this.IMAGES_DEAD);
        }
    } catch (error) {
        console.error('Error in ChickenSmall animation:', error);
    }
}, 50);

    }

}