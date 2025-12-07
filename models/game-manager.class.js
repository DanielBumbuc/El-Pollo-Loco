/**
 * GameManager handles collision detection, collectibles management, and endboss behavior
 * This class was extracted from World class to reduce file size and improve code organization
 */
class GameManager {
    world;

    /**
     * Initializes the GameManager with a reference to the world
     * @param {World} world - Reference to the game world instance
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Checks all collision types in the game world
     * Handles enemy, endboss, bottle, and coin collision detection
     */
    checkCollisions() {
        if (!this.world.level || !this.world.character) {
            return;
        }
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.world.character.isColliding(enemy) && !enemy.isDead()) {
                this.setCollisionEnemy(enemy);
            }
        });
        if (this.world.level.endboss) {
            this.setCollisionEndboss();
        }
        if (this.world.level.bottles) {
            this.setCollisionBottle();
        }
        if (this.world.level.coins) {
            this.setCollisionCoin();
        }
    }

    /**
     * Handles collision between character and regular enemy
     * @param {Object} enemy - The enemy object involved in collision
     * Either makes character jump on enemy (killing it) or character takes damage
     */
    setCollisionEnemy(enemy) {
        if (this.world.character.isLandingOnTop(enemy)) {
            this.world.character.jumpOnEnemy();
            setTimeout(() => {
                this.removeDeadEnemies();
            }, 200);
        } else  if (!this.world.character.isHurt()) {
            this.world.character.hit(10);
            this.world.statusbarLifepoints.setPercentage(this.world.character.lifepoints);
        }
    }

    /**
     * Handles collision between character and endboss
     * Character takes damage when touching endboss
     */
    setCollisionEndboss() {
        this.world.level.endboss.forEach(endboss => {
            if (this.world.character.isColliding(endboss) && !this.world.character.isHurt()) {
                this.world.character.hit(20);
                this.world.statusbarLifepoints.setPercentage(this.world.character.lifepoints);
            }
        });
    }

    /**
     * Handles collision between character and collectible bottles
     * Increases character bottle count and updates status bar
     */
    setCollisionBottle() {
        this.world.level.bottles.forEach(bottle => {
            if (this.world.character.isColliding(bottle)) {
                this.world.character.collectBottle();
                this.world.statusbarBottles.setPercentage(this.world.character.bottleAmount);
                this.removeCollectedObject(bottle);
            }
        });
    }

    /**
     * Handles collision between character and collectible coins
     * Increases character coin count and updates status bar
     */
    setCollisionCoin() {
        this.world.level.coins.forEach(coin => {
            if (this.world.character.isColliding(coin)) {
                this.world.character.collectCoin();
                this.world.statusbarCoins.setPercentage(this.world.character.coinAmount);
                this.removeCollectedObject(coin);
            }
        });
    }

    /**
     * Removes a collected object from the appropriate level array
     * @param {Object} collectable - The collected item (bottle or coin) to remove
     * Handles cleanup for both bottles and coins from level arrays
     */
    removeCollectedObject(collectable) {
        const bottleIndex = this.world.level.bottles.indexOf(collectable);
        const coinIndex = this.world.level.coins.indexOf(collectable);
        if (bottleIndex > -1) {
            this.world.level.bottles.splice(bottleIndex, 1);
        } else if (coinIndex > -1) {
            this.world.level.coins.splice(coinIndex, 1);
        }
    }

    /**
     * Removes dead enemies from the level enemies array
     * Filters out enemies that have been killed by the character
     */
    removeDeadEnemies() {
        if (this.world.level && this.world.level.enemies) {
            this.world.level.enemies = this.world.level.enemies.filter(enemy => !enemy.isDead());
        }
    }

    /**
     * Removes dead endboss from the level endboss array
     * Filters out defeated endboss and logs defeat message
     */
    removeDeadEndboss() {
        if (this.world.level && this.world.level.endboss) {
            this.world.level.endboss = this.world.level.endboss.filter(endboss => !endboss.isDead());
        }
    }

    /**
     * Handles character death by removing character and triggering game over
     * Sets game over state and initializes restart button
     */
    removeDeadCharacter() {
        if (this.world.character && this.world.character.isDead()) {
            this.world.character = null;
            this.world.isGameOver = true;
            this.world.initRestartButton();
        }
    }

    /**
     * Initializes placement of all collectible items in the level
     * Places bottles and coins in calculated positions across the map
     */
    setCollectables() {
        this.placeBottles();
        this.placeCoins();
    }

    /**
     * Calculates and sets positions for all bottles in the level
     * Ensures minimum spacing between bottles and avoids placement conflicts
     */
    placeBottles() {
        let mapWidth = this.world.level.level_end_x - 200;
        let minX = 200;
        let minDistance = 100;
        let usedPosition = [];
        this.world.level.bottles.forEach(bottle => {
            this.calcBottlePosition(bottle, usedPosition, minX, mapWidth, minDistance);
        });
    }

    /**
     * Calculates valid placement position for an individual bottle
     * @param {Object} bottle - The bottle object to position
     * @param {Array} usedPosition - Array of already used positions to avoid conflicts
     * @param {number} minX - Minimum x position for bottle placement
     * @param {number} mapWidth - Maximum width of the map for placement
     * @param {number} minDistance - Minimum distance between bottles
     * Uses random positioning with collision avoidance algorithm
     */
    calcBottlePosition(bottle, usedPosition, minX, mapWidth, minDistance) {
        let bottlePosition;
        let tries = 0;
        do {
            bottlePosition = minX + Math.floor(Math.random() * mapWidth);
            tries++;
        } while (
            usedPosition.some(pos => Math.abs(pos - bottlePosition) < minDistance) &&
            tries < 100
        );
        usedPosition.push(bottlePosition);
        bottle.x = bottlePosition;
    }

    /**
     * Calculates and sets positions for all coins in the level
     * Ensures minimum spacing between coins and avoids placement conflicts
     */
    placeCoins() {
        let mapWidth = this.world.level.level_end_x - 200;
        let minX = 200;
        let minDistance = 100;
        let usedPosition = [];
        this.world.level.coins.forEach(coin => {
            this.calcCoinPosition(coin, usedPosition, minX, mapWidth, minDistance);
        });
    }

    /**
     * Calculates valid placement position for an individual coin
     * @param {Object} coin - The coin object to position
     * @param {Array} usedPosition - Array of already used positions to avoid conflicts
     * @param {number} minX - Minimum x position for coin placement
     * @param {number} mapWidth - Maximum width of the map for placement
     * @param {number} minDistance - Minimum distance between coins
     * Uses random positioning with collision avoidance algorithm
     */
    calcCoinPosition(coin, usedPosition, minX, mapWidth, minDistance) {
        let coinPosition;
        let tries = 0;
        do {
            coinPosition = minX + Math.floor(Math.random() * mapWidth);
            tries++;
        } while (
            usedPosition.some(pos => Math.abs(pos - coinPosition) < minDistance) &&
            tries < 100
        );
        usedPosition.push(coinPosition);
        coin.x = coinPosition;
    }

    /**
     * Monitors character position and spawns the endboss when character reaches position 2200
     * Creates interval that checks character position every 200ms until spawn trigger
     */
    spawnEndboss() {
        let spawnInterval = setInterval(() => {
            if (!this.world.level || !this.world.character) {
                clearInterval(spawnInterval);
                return;
            } else if (this.world.character.x >= 2200) {
                this.setIncomingEndboss();
                clearInterval(spawnInterval);
            }
        }, 200);
    }

    /**
     * Activates endboss encounter by starting animations and changing music
     * Shows endboss health bar and switches to boss fight audio track
     */
    setIncomingEndboss() {
        if (this.world.level.endboss && this.world.level.endboss.length > 0) {
            this.world.level.endboss.forEach(endboss => endboss.animate());
            this.world.showEndbossStatusbar = true;
            this.world.statusbarEndboss.animateStatusbar();
            if (window.soundManager) {
                window.soundManager.stopBackgroundMusic();
                window.soundManager.playSound('bossFightMusic');
            }
        }
    }

    /**
     * Monitors character position relative to endboss for AI behavior
     * Triggers endboss alert state and direction changes based on character proximity
     */
    checkCharacterPosition() {
        let alertDistance = 150;
        if (!this.world.level || !this.world.character || !this.world.level.endboss) {
            return;
        }
        this.world.level.endboss.forEach(endboss => {
            this.setCharacterPosition(endboss, alertDistance);
        });
    }

    /**
     * Updates endboss behavior based on character position and proximity
     * @param {Object} endboss - The endboss object to update
     * @param {number} alertDistance - Distance threshold for alert state trigger
     * Sets direction, attack mode, movement restrictions, and alert status
     */
    setCharacterPosition(endboss, alertDistance) {
        if (this.world.character.x > endboss.x) {
            endboss.otherDirection = true;
            endboss.attackRight = true;
        } else {
            endboss.otherDirection = false;
            endboss.attackLeft = true;
        }
        if (this.world.character.x + alertDistance > endboss.x && this.world.character.x < endboss.x + endboss.width) {
            endboss.canMoveLeft = false;
            endboss.alert = true;
        } else {
            endboss.canMoveLeft = true;
            endboss.alert = false;
        }
    }
}