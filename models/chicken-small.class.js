class ChickenSmall extends MoveableObject {
    y = 355;
    width = 60;
    height = 60;
    lifepoints = 100;
    offset = {
        top: 10,
        bottom: 15,
        left: 10,
        right: 15
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
        // Spawn im ersten Drittel des Levels
        let levelWidth = 720 * 4; // 4 Background-Segmente
        let spawnStart = levelWidth * 0.25; // 25% vom Level-Anfang  
        let spawnRange = levelWidth * 0.75; // 75% der Level-Breite
        this.x = spawnStart + Math.random() * spawnRange;
        // this.x = 350 + Math.random() * 500;
        this.speed = 1.5 + Math.random() * 0.25;
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