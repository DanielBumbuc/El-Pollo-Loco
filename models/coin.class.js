/**
 * Collectible coin class that can be gathered by the character
 * Extends MoveableObject to support collision detection and animations
 */
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
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new collectible coin with animation setup
     * Loads coin images and starts animation cycle
     */
    constructor() {
        super();
        this.loadImg('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);    
        this.animateCoins();
    }

    /**
     * Starts the coin animation cycle
     * Continuously cycles through coin images to create a spinning effect
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000);
    }
    
}