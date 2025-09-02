class Level {
    backgrounds;
    clouds;
    enemies;
    endboss;
    bottles;
    coins;
    level_end_x = 2000;

    constructor(backgrounds, clouds, enemies, endboss, bottles, coins) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }
}