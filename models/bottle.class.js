class Bottle extends MoveableObject {
    y = 370;
    width = 50;
    height = 50;
    minDistance = 350;
    
    constructor() {
        super();
        this.loadImg('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    
    }
}