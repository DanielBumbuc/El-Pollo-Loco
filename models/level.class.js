/**
 * Level class that contains all game objects and level configuration
 * Manages backgrounds, enemies, collectibles, and level boundaries
 */
class Level {
    backgrounds;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    level_end_x = 2880;

    /**
     * Creates a new level with all required game objects
     * @param {Background[]} backgrounds - Array of background layer objects
     * @param {Cloud[]} clouds - Array of cloud objects for sky animation
     * @param {MoveableObject[]} enemies - Array of enemy objects (chickens)
     * @param {Endboss[]} endboss - Array containing the level's endboss
     * @param {Bottle[]} bottles - Array of collectible bottle objects
     * @param {Coin[]} coins - Array of collectible coin objects
     */
    constructor(backgrounds, clouds, enemies, endboss, bottles, coins) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }
}