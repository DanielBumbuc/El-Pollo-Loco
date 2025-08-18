class Level {
    backgrounds;
    clouds;
    enemies;
    bottles;
    coins;
    level_end_x = 2000;

    constructor(backgrounds, clouds, enemies, bottles, coins) {
        this.backgrounds = backgrounds;
        this.clouds = clouds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
    }
}