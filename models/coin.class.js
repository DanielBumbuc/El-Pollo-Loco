class Coin extends MoveableObject {
    y = 370;
    width = 50;
    height = 50;
    minDistance = 350;
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    constructor() {
        super();
        this.loadImg('../img/8_coin/coin_1.png');

    }
}