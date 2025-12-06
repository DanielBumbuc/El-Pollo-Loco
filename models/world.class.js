class World {
    canvas;
    ctx;
    gameState = false;
    keyboard;
    savedMuted;
    camera_x = 0;
    character = new Character();
    statusbarLifepoints = new Statusbar('lifepoints', 20, 20, 100);
    statusbarCoins = new Statusbar('coins', 20, 60, 0);
    statusbarBottles = new Statusbar('bottles', 20, 100, 50);
    statusbarEndboss = new Statusbar('endboss', 740, 20, 100);
    showEndbossStatusbar = false;
    throwableObject = [];
    bottleCooldownAktive = false;
    level = null;
    startScreen = new StartGame();
    gameOverScreen = new GameOver();
    youWonScreen = new YouWon();
    isGameOver = false;
    isYouWon = false;

    constructor(canvas, keyboard, volume) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    draw() {
        let self = this;
        if (this.isGameOver) {
            this.drawGameOver();
        } else if (this.isYouWon) {
            this.drawYouWon();
        } else if (!this.gameState) {
            this.drawStartScreen();
        } else if (!this.character || !this.level) {
            return;
        } else {
            this.drawGameplay();
        }
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.gameOverScreen.draw(this.ctx);
    }

    drawYouWon() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.youWonScreen.draw(this.ctx);
        this.character = null;
    }

    drawStartScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.startScreen.draw(this.ctx);
    }

    drawGameplay() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarLifepoints);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        if (this.showEndbossStatusbar) {
            this.addToMap(this.statusbarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
    } // anpassen?

    setWorld() {
        this.character.world = this;
        this.throwableObject.world = this;
    }

    startGame() {
        this.character.resetIdleCounter();
        this.setCollectables();
        this.run();
        this.spawnEndboss();
        this.level.enemies.forEach(chicken => chicken.animateWalking());
        this.loadSavedSettings();
        if (window.soundManager) {
            if (window.innerWidth <= 935) {
                window.soundManager.activateAudioContext();
            }
            window.soundManager.playBackgroundMusic();
        }
    }

    loadSavedSettings() {
        this.savedMuted = localStorage.getItem('gameMuted');
        if (this.savedMuted === 'true') {
            window.soundManager.setMuted(true);
            document.querySelector('.volume-btn').classList.remove('active');
        } else {
            window.soundManager.setMuted(false);
            document.querySelector('.volume-btn').classList.add('active');
        }
    }

    toggleVolumeImg() {
        let volumeBtn = document.getElementById('volumeButton');
        let volumeOnIcon = document.getElementById('volumeOnIcon');
        let volumeOffIcon = document.getElementById('volumeOffIcon');
        if (!window.soundManager.isMuted) {
            volumeBtn.classList.remove('active');
            volumeOnIcon.classList.add('d-none');
            volumeOffIcon.classList.remove('d-none');
            window.soundManager.isMuted = true;
            this.toggleVolume();
        } else {
            volumeBtn.classList.add('active');
            volumeOnIcon.classList.remove('d-none');
            volumeOffIcon.classList.add('d-none');
            window.soundManager.isMuted = false;
            this.toggleVolume();
        }
    } //anpassen??

    toggleVolume() {
        if (!window.soundManager.isMuted) {
            if (window.soundManager) {
                window.soundManager.setMuted(false);
                localStorage.setItem('gameMuted', 'false');
            }
        } else {
            if (window.soundManager) {
                window.soundManager.setMuted(true);
                localStorage.setItem('gameMuted', 'true');
            }
        }
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
        let runInterval = setInterval(() => {
            if (!this.level || !this.character) {
                return;
            }
            this.checkCollisions();
            this.checkCharacterPosition();
            this.checkWinLose(runInterval);

        }, 80);
    }

    checkWinLose(runInterval) {
        if (this.character.deadAnimationDone) {
            this.removeDeadCharacter();
            clearInterval(runInterval);
        } else if (this.level.endboss && this.level.endboss[0] && this.level.endboss[0].deadAnimationDone) {
            this.removeDeadEndboss();
            clearInterval(runInterval);
            this.isYouWon = true;
            this.initRestartButton();
        }
    }


    spawnEndboss() {
        let spawnInterval = setInterval(() => {
            if (!this.level || !this.character) {
                clearInterval(spawnInterval);
                return;
            } else if (this.character.x >= 2200) {
                this.setIncomingEndboss();
                clearInterval(spawnInterval);
            }
        }, 200);
    }

    setIncomingEndboss() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            this.level.endboss.forEach(endboss => endboss.animate());
            this.showEndbossStatusbar = true;
            this.statusbarEndboss.animateStatusbar();
            if (window.soundManager) {
                window.soundManager.stopBackgroundMusic();
                window.soundManager.playSound('bossFightMusic');
                console.log('Endboss fight music started!');
            }
        }
    }

    checkCollisions() {
        if (!this.level || !this.character) {
            return;
        }
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.setCollisionEnemy(enemy);
            }
        });
        if (this.level.endboss) {
            this.setCollisionEndboss();
        }
        if (this.level.bottles) {
            this.setCollisionBottle();
        }
        if (this.level.coins) {
            this.setCollisionCoin();
        }
    } //anpaseen??

    setCollisionEnemy(enemy) {
        if (this.character.isLandingOnTop(enemy)) {
            this.character.jumpOnEnemy();
            setTimeout(() => {
                this.removeDeadEnemies();
            }, 200);
        } else {
            this.character.hit(10);
            this.statusbarLifepoints.setPercentage(this.character.lifepoints);
        }
    }

    setCollisionEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hit(10);
                this.statusbarLifepoints.setPercentage(this.character.lifepoints);
            }
        });
    }

    setCollisionBottle() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.statusbarBottles.setPercentage(this.character.bottleAmount);
                this.removeCollectedObject(bottle);
            }
        });
    }

    setCollisionCoin() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.statusbarCoins.setPercentage(this.character.coinAmount);
                this.removeCollectedObject(coin);
            }
        });
    }

    checkThrowObjects() {
        this.speedX = this.character.otherDirection ? -10 : 10;
        if (this.bottleCooldownAktive) {
            console.log('Cooldown aktiv!');
            return;
        }
        if (this.character.bottleAmount < 10) {
            return;
        }
        let bottle = new ThrowableObject(this.character.x, this.character.y, this.speedX, this);
        this.setThrowableObject(bottle);
        this.bottleCooldown();
    }

    setThrowableObject(bottle) {
        this.throwableObject.push(bottle);
        this.character.bottleAmount -= 10;
        this.statusbarBottles.setPercentage(this.character.bottleAmount);
        setInterval(() => {
            if (bottle.isOnGround == true) {
                this.throwableObject = this.throwableObject.filter(bottle => bottle.y < 420);
            }
        }, 40);
    }

    bottleCooldown() {
        this.bottleCooldownAktive = true;
        setTimeout(() => {
            this.bottleCooldownAktive = false;
        }, 1000);
    }

    checkCharacterPosition() {
        let alertDistance = 150;
        if (!this.level || !this.character || !this.level.endboss) {
            return;
        }
        this.level.endboss.forEach(endboss => {
            this.setCharacterPosition(endboss, alertDistance);
        });
    }

    setCharacterPosition(endboss, alertDistance) {
        if (this.character.x > endboss.x) {
            endboss.otherDirection = true;
            endboss.attackRight = true;
        } else {
            endboss.otherDirection = false;
            endboss.attackLeft = true;
        }
        if (this.character.x + alertDistance > endboss.x && this.character.x < endboss.x + endboss.width) {
            endboss.canMoveLeft = false;
            endboss.alert = true;
        } else {
            endboss.canMoveLeft = true;
            endboss.alert = false;
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
            this.calcBottlePosition(bottle, usedPosition, minX, mapWidth, minDistance);
        });
    }

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

    placeCoins() {
        let mapWidth = this.level.level_end_x - 200;
        let minX = 200;
        let minDistance = 100;
        let usedPosition = [];
        this.level.coins.forEach(coin => {
            this.calcCoinPosition(coin, usedPosition, minX, mapWidth, minDistance);
        });
    }

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

    removeDeadEnemies() {
        if (this.level && this.level.enemies) {
            this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDead());
        }
    }

    removeDeadEndboss() {
        if (this.level && this.level.endboss) {
            console.log('endboss is dead');

            this.level.endboss = this.level.endboss.filter(endboss => !endboss.isDead());
        }
    }

    removeDeadCharacter() {
        if (this.character && this.character.isDead()) {
            this.character = null;
            this.isGameOver = true;
            this.initRestartButton();
        }
    }

    initRestartButton() {
        let restartBtn = document.getElementById('restartButton');
        setInterval(() => {
            if (this.isGameOver || this.isYouWon) {
                console.log('you won', this.isYouWon, 'you lose', this.isGameOver);

                restartBtn.classList.remove('d-none');
            }
        }, 2000);

    }
}
