class Bottle extends MoveableObject {
    y = 370;
    width = 50;
    height = 50;
    minDistance = 350;
    offset = {
        top: 10,
        bottom: 7.5,
        left: 20,
        right: 15
    }
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    constructor() {
        super();
        this.loadImg('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);    
        this.animateBottles();
    }

    animateBottles() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 1000);  
    }

}