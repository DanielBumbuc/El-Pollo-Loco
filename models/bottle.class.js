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
    
    constructor() {
        super();
        this.loadImg('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    
    }
}