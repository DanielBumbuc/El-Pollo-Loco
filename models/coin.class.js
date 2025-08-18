class Coin extends MoveableObject {
    y = 370;
    width = 50;
    height = 50;
    minDistance = 350;

    constructor() {
        super();
        this.loadImg('../img/8_coin/coin_1.png');

    }
}