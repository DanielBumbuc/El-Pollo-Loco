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
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImg('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);    
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000);
    }
    
}