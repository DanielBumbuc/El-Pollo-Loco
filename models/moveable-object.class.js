class MoveableObject extends DrawableObject {
    speed = 0.15;
    canMoveLeft = true;
    lifepoints = 100;
    bottleAmount = 50;
    coinAmount = 0;
    lastHit = 0;
    speedY = 0;
    acceleration = 2.5;
    onGroundY = 130;
    jumpAnimationInterval = null;
    jumpStartTime = null;
    jumpEndTime = null;
    jumpDuration = 1000;
    dead = false;
    deadAnimationDone = false;
    alertAnimationActive = false;
    attackAnimationActive = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Plays a sound effect through the global sound manager
     * @param {string} sound - The sound identifier to play
     */
    playSound(sound) {
        if (window.soundManager) {
            window.soundManager.playSound(sound);
        }
    }

    /**
     * Sets the volume for a specific sound effect
     * @param {string} sound - The sound identifier
     * @param {number} volume - Volume level between 0 and 1
     */
    setSoundVolume(sound, volume) {
        if (window.soundManager) {
            window.soundManager.setSoundVolume(sound, volume);
        }
    }

    /**
     * Checks if the object is above ground level
     * @returns {boolean} True if object is above ground, false otherwise
     * Special case for throwable objects which are always considered above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Applies gravity physics to the object
     * Continuously updates vertical position and velocity for realistic falling motion
     * Handles ground collision for character objects
     */
    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this instanceof Character && this.y > this.onGroundY) {
                    this.y = this.onGroundY;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);

    }

    /**
     * Plays a sequence of images to create animation effect
     * @param {string[]} images - Array of image paths for animation frames
     * Cycles through images based on current frame counter
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

    /**
     * Starts alert animation sequence for endboss encounters
     * Plays through alert animation frames and sets alert completion flag
     */
    startAlertAnimation() {
        this.alertAnimationActive = true;
        let i = 0;
        let interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ALERT[i]];
            i++;
            if (i >= this.IMAGES_ALERT.length) {
                clearInterval(interval);
                this.alertAnimationActive = false;
                this.hasAlerted = true;
            }
        }, 300);
    }



    /**
     * Starts attack animation sequence with mid-animation trigger
     * Triggers attack position at halfway point and manages attack state flags
     */
    startAttackAnimation() {
        this.attackAnimationActive = true;
        let i = 0;
        let interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ATTACK[i]];
            i++;
            if (i >= this.IMAGES_ATTACK.length / 2 && !this.hasAttacked) {
                this.hasAttacked = true;
                this.attackPosition();
            } else if (i >= this.IMAGES_ATTACK.length) {
                clearInterval(interval);
                this.attackAnimationActive = false;
                this.hasAttacked = false;
            }
        }, 100);
    }

    /**
     * Moves the object rightward and sets facing direction
     * Updates position and resets direction flag for proper sprite orientation
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    setCamera() {
        if (this.world.gameState) {
            let endboss = this.world.level.endboss[0];
            let levelEndX = this.world.level.level_end_x;
            let maxCameraX = -(levelEndX - this.world.canvas.width + 100);
            let targetOffset;
            let offsetDifference;
            if (this.currentCameraOffset === undefined) {
                this.currentCameraOffset = 100;
            }
            this.setCameraPosition(endboss, targetOffset, offsetDifference);
            this.world.camera_x = -this.x + this.currentCameraOffset;
            this.world.camera_x = Math.max(this.world.camera_x, maxCameraX);
        }
    }

    setCameraPosition(endboss, targetOffset, offsetDifference) {
        if (endboss && this.x > endboss.x) {
            targetOffset = 520;
        } else {
            targetOffset = 100;
        }
        offsetDifference = targetOffset - this.currentCameraOffset;
        if (Math.abs(offsetDifference) > 2) {
            this.currentCameraOffset += offsetDifference * 0.02;
        } else {
            this.currentCameraOffset = targetOffset;
        }
    }

    moveLeft() {
        if (this.canMoveLeft) {
            this.x -= this.speed;
        }
    }

    jump() {
        this.jumpStartTime = Date.now();
        this.jumpEndTime = null;
        this.speedY = 28;
        this.startJumpAnimation();
        this.playSound('jump');

    }

    calcJumpDuration() {
        if (!this.isAboveGround() && this.jumpStartTime && !this.jumpEndTime) {
            this.jumpEndTime = Date.now();
            this.jumpDuration = this.jumpEndTime - this.jumpStartTime;
            this.jumpStartTime = null;
        }
        return this.jumpDuration;
    }

    startJumpAnimation() {
        if (this.jumpAnimationInterval) {
            clearInterval(this.jumpAnimationInterval);
        }
        this.jumpAnimationInterval = setInterval(() => {
            this.calcJumpFrames();
        }, 30);
    }

    calcJumpFrames() {
        if (!this.isAboveGround()) {
            clearInterval(this.jumpAnimationInterval);
            this.jumpAnimationInterval = null;
            return;
        }
        let elapsed = Date.now() - this.jumpStartTime;
        let jumpProgress = elapsed / this.calcJumpDuration();
        let frameIndex;
        jumpProgress = Math.max(0, Math.min(jumpProgress, 1));
        if (jumpProgress <= 0.2) {
            frameIndex = Math.floor((jumpProgress / 0.2) * 4); // 0-3
        } else if (jumpProgress <= 0.8) {
            frameIndex = 4 + Math.floor(((jumpProgress - 0.2) / 0.6) * 3); // 4-6
        } else {
            frameIndex = 7 + Math.floor(((jumpProgress - 0.8) / 0.2) * 2); // 7-8
        }
        frameIndex = Math.max(0, Math.min(frameIndex, this.IMAGES_JUMPING.length - 1));
        this.img = this.imageCache[this.IMAGES_JUMPING[frameIndex]];
    }

    setJumpFrames(jumpProgress, frameIndex) {
        
    }

    startDeadAnimation() {
        let frame = 0;
        this.deadAnimationInterval = setInterval(() => {
            if (frame < this.IMAGES_DEAD.length && this.dead === true) {
                this.img = this.imageCache[this.IMAGES_DEAD[frame]];
                frame++;
            }
            else {
                clearInterval(this.deadAnimationInterval);
                this.deadAnimationDone = true;
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
            }
        }, 120);
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y < mo.y + mo.height - mo.offset.bottom;
    }

    isLandingOnTop(enemy) {
        let isFalling = this.speedY < 0;
        let isAboveEnemy = this.y + this.height - this.offset.bottom < enemy.y + enemy.offset.top + 20;
        let hasHorizontalOverlap = this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
        return isFalling && isAboveEnemy && hasHorizontalOverlap;
    }

    hit(damage) {
        this.lifepoints -= damage;
        this.playSound('hit');
        if (this.lifepoints < 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let passedTime = new Date().getTime() - this.lastHit;
        passedTime = passedTime / 1000;
        return passedTime < 0.8;
    }

    isDead() {
        if ((this instanceof Character || this instanceof Endboss) && this.lifepoints == 0 && !this.dead) {
            this.dead = true;
            this.startDeadAnimation();
            if (this instanceof Endboss) {
                if (window.soundManager) {
                    window.soundManager.stopBackgroundMusic();
                    window.soundManager.playSound('endbossDead');
                }
            } else if (this instanceof Character) {
                if (window.soundManager) {
                    window.soundManager.stopBackgroundMusic();
                    window.soundManager.playSound('dead');
                }
            }
        }
        return this.lifepoints == 0;
    }

    collectBottle() {
        this.bottleAmount += 10;
        this.playSound('bottle');
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        }
    }

    collectCoin() {
        this.coinAmount += 10;
        this.playSound('coin');
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }
}