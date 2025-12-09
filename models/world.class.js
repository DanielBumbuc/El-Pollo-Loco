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
    gameManager;

    /**
     * Initializes the World instance with canvas, keyboard and volume settings
     * @param {HTMLCanvasElement} canvas - The game canvas element
     * @param {Keyboard} keyboard - The keyboard input handler
     * @param {number} volume - Initial volume setting
     */
    constructor(canvas, keyboard, volume) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.gameManager = new GameManager(this);
        this.setWorld();
        this.draw();
    }

    /**
     * Main drawing loop that renders different game states
     */
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

    /**
     * Renders the game over screen
     */
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.gameOverScreen.draw(this.ctx);
    }

    /**
     * Renders the victory screen and removes character
     */
    drawYouWon() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.youWonScreen.draw(this.ctx);
        this.character = null;
    }

    /**
     * Renders the start screen before game begins
     */
    drawStartScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.startScreen.draw(this.ctx);
    }

    /**
     * Renders the main gameplay with camera translations and all game objects
     */
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
    }

    /**
     * Sets up world references for character and throwable objects
     */
    setWorld() {
        this.character.world = this;
        this.throwableObject.world = this;
    }

    /**
     * Initializes and starts the game with all necessary components
     */
    startGame() {
        this.character.resetIdleCounter();
        this.gameManager.setCollectables();
        this.run();
        this.gameManager.spawnEndboss();
        this.level.enemies.forEach(chicken => chicken.animateWalking());
        this.loadSavedSettings();
        if (window.soundManager) {
            if (window.innerWidth <= 935) {
                window.soundManager.activateAudioContext();
            }
            window.soundManager.playBackgroundMusic();
        }
    }

    /**
     * Loads sound settings from localStorage and applies them
     */
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

    /**
     * Toggles volume icon display between muted and unmuted states
     */
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
    }

    /**
     * Toggles volume settings and saves state to localStorage
     */
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

    /**
     * Adds an array of objects to the rendering map
     * @param {Array} objects - Array of objects to be rendered
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single moveable object to the rendering map with direction handling
     * @param {MoveableObject} mo - Moveable object to be added
     */
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

    /**
     * Flips image horizontally for objects facing the other direction
     * @param {MoveableObject} mo - Moveable object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
        this.ctx.restore();
    }

    /**
     * Main game loop that handles collisions and character/enemy state checks
     */
    run() {
        let runInterval = setInterval(() => {
            if (!this.level || !this.character) {
                return;
            }
            this.gameManager.checkCollisions();
            this.gameManager.checkCharacterPosition();
            this.checkWinLose(runInterval);
        }, 80);
    }

    /**
     * Checks win and lose conditions during the game loop
     * @param {number} runInterval - The interval ID to clear when game ends
     * Handles both character death (game over) and endboss death (victory)
     */
    checkWinLose(runInterval) {
        if (this.character.deadAnimationDone) {
            this.gameManager.removeDeadCharacter();
            clearInterval(runInterval);
        } else if (this.level.endboss && this.level.endboss[0] && this.level.endboss[0].deadAnimationDone) {
            this.gameManager.removeDeadEndboss();
            clearInterval(runInterval);
            this.isYouWon = true;
            this.initRestartButton();
        }
    }

    /**
     * Handles throwable object mechanics including bottle throwing and collision detection
     * Manages cooldown timer and throwing speed based on character direction
     */
    checkThrowObjects() {
        this.speedX = this.character.otherDirection ? -10 : 10;
        if (this.bottleCooldownAktive) {
            return;
        }
        if (this.character.bottleAmount < 10) {
            return;
        }
        let bottle = new ThrowableObject(this.character.x, this.character.y, this.speedX, this);
        this.setThrowableObject(bottle);
        this.bottleCooldown();
    }

    /**
     * Creates and manages a new throwable bottle object
     * @param {ThrowableObject} bottle - The throwable bottle object to add to the game
     * Updates bottle inventory and removes bottles that hit the ground
     */
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

    /**
     * Implements cooldown timer for bottle throwing to prevent spam
     * Sets 1 second cooldown between bottle throws
     */
    bottleCooldown() {
        this.bottleCooldownAktive = true;
        setTimeout(() => {
            this.bottleCooldownAktive = false;
        }, 1200);
    }

    /**
     * Initializes restart button visibility after game ends
     * Shows restart button 2 seconds after game over or victory state
     */
    initRestartButton() {
        let restartBtn = document.getElementById('restartButton');
        setInterval(() => {
            if (this.isGameOver || this.isYouWon) {
                restartBtn.classList.remove('d-none');
            }
        }, 2000);
    }
}