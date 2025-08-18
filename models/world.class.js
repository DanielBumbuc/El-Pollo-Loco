class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    character = new Character();
    statusbarLifepoints = new Statusbar('lifepoints', 20, 20, 100);
    statusbarCoins = new Statusbar('coins', 20, 60, 0);
    statusbarBottles = new Statusbar('bottles', 20, 100, 0);
    throwableObject = [];
    level = level1;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setCollectables();
        this.run();
    }

    draw() {
        let self = this;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarLifepoints);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(function () {
            self.draw();
        });
    }

    setWorld() {
        this.character.world = this;
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
            mo.drawFrame(this.ctx);
        }
        else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.chekcThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarLifepoints.setPercentage(this.character.lifepoints);
            }
        });

        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.statusbarBottles.setPercentage(this.character.bottleAmount);
                this.removeCollectedObject(bottle);
            }
        });

        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.statusbarCoins.setPercentage(this.character.coinAmount);
                this.removeCollectedObject(coin);
            }
        });
    }

    chekcThrowObjects() {
        this.speedX = this.character.otherDirection ? -10 : 10;
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.speedX);
            if (this.character.bottleAmount < 10) {
                return;
            } else if (this.character.bottleAmount >= 10) {
                this.throwableObject.push(bottle);    
                this.character.bottleAmount -= 10;
                this.statusbarBottles.setPercentage(this.character.bottleAmount);
            }
            setInterval(() => {
                if (bottle.isOnGround == true) {
                    this.throwableObject = this.throwableObject.filter(bottle => bottle.y < 420);
                }
            }, 40);
        }
    }

    setCollectables() {
        this.placeBottles();
        this.placeCoins();
    }

    removeCollectedObject(collectable) {
        const bottleIndex = this.level.bottles.indexOf(collectable);
        const coinIndex = this.level.coins.indexOf(collectable);
        if (bottleIndex > -1) {
            this.level.bottles.splice(bottleIndex, 1);
        } else if (coinIndex > -1) {
            this.level.coins.splice(coinIndex, 1);
        }
    }

    placeBottles() {
        let mapWidth = this.level.level_end_x - 200;
        let minX = 200;
        let minDistance = 100;
        let usedPosition = [];
        this.level.bottles.forEach(bottle => {
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
        });
    }

    placeCoins() {
        let mapWidth = this.level.level_end_x - 200;
        let minX = 200;
        let minDistance = 100;
        let usedPosition = [];
        this.level.coins.forEach(coin => {
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
        });
    }
}
