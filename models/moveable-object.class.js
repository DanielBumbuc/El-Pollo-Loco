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

    playSound(sound) {
        if (window.soundManager) {
            window.soundManager.playSound(sound);
        }
    }

    setSoundVolume(sound, volume) {
        if (window.soundManager) {
            window.soundManager.setSoundVolume(sound, volume);
        }
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

    startAlertAnimation() {
        this.alertAnimationActive = true;
        let i = 0;
        let interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ALERT[i]];
            i++;
            if (i >= this.IMAGES_ALERT.length) {
                clearInterval(interval);
                this.alertAnimationActive = false; // Animation ist fertig
                this.hasAlerted = true;
            }
        }, 300); // Geschwindigkeit der Alert-Animation
    }



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
                this.attackAnimationActive = false; // Animation ist fertig
                this.hasAttacked = false; // Reset für nächsten Angriff
            }
        }, 100); // Geschwindigkeit der Attack-Animation
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    // setCamera() {
    //     if (this.world.gameState) {
    //         this.world.camera_x = -this.x + 100;
    //         let levelEndX = this.world.level.level_end_x;
    //         let maxCameraX = -(levelEndX - this.world.canvas.width + 100);
    //         this.world.camera_x = Math.max(this.world.camera_x, maxCameraX);
    //     }

    // }

    setCamera() {
        if (this.world.gameState) {
            // Variablen-Definitionen am Anfang
            let endboss = this.world.level.endboss[0];
            let levelEndX = this.world.level.level_end_x;
            let maxCameraX = -(levelEndX - this.world.canvas.width + 100);
            let targetOffset;
            let offsetDifference;
            
            // Initialisierung
            if (this.currentCameraOffset === undefined) {
                this.currentCameraOffset = 100; // Standard-Offset links
            }
            
            // Logik: Target-Offset bestimmen
            if (endboss && this.x > endboss.x) {
                // Character hinter Boss: Zeige Character rechts im Bild
                targetOffset = 520; // 720px Canvas - 200px Margin = 520px
            } else {
                // Character vor Boss: Zeige Character links im Bild (normal)
                targetOffset = 100;
            }
            
            // Logik: Smooth Transition berechnen
            offsetDifference = targetOffset - this.currentCameraOffset;
            
            if (Math.abs(offsetDifference) > 2) {
                // Schrittweise Anpassung für smooth Transition
                this.currentCameraOffset += offsetDifference * 0.02; // 2% pro Frame für sanfte Bewegung
            } else {
                // Bei kleinen Unterschieden direkt setzen
                this.currentCameraOffset = targetOffset;
            }
            
            // Logik: Kamera-Position setzen und begrenzen
            this.world.camera_x = -this.x + this.currentCameraOffset;
            this.world.camera_x = Math.max(this.world.camera_x, maxCameraX);
        }
    }

    moveLeft() {
        if (this.canMoveLeft) {
            this.x -= this.speed;
        }
    }

    jump() {
        this.jumpStartTime = Date.now();
        this.jumpEndTime;
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
            if (!this.isAboveGround()) {
                clearInterval(this.jumpAnimationInterval);
                this.jumpAnimationInterval = null;
                return;
            }
            let elapsed = Date.now() - this.jumpStartTime;
            let jumpProgress = elapsed / this.calcJumpDuration();
            jumpProgress = Math.max(0, Math.min(jumpProgress, 1));
            let frameIndex = Math.floor(jumpProgress * this.IMAGES_JUMPING.length);
            frameIndex = Math.max(0, Math.min(frameIndex, this.IMAGES_JUMPING.length - 1));
            this.img = this.imageCache[this.IMAGES_JUMPING[frameIndex]];
        }, 30);
    }

    startDeadAnimation() {
        let frame = 0;

        this.deadAnimationInterval = setInterval(() => {
            if (frame < this.IMAGES_DEAD.length && this.dead === true) {
                this.img = this.imageCache[this.IMAGES_DEAD[frame]];
                frame++;
                console.log(frame);
            }
            else {
                clearInterval(this.deadAnimationInterval);
                this.deadAnimationDone = true;
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
            }
        }, 120);
    }

    isColliding(mo) {
        //check collision with offset parameter
        // console.log(this.x + this.width - this.offset.right);
        // console.log('left:', this.x + this.offset.left + ' right:' , this.x + this.width - this.offset.right);

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && //right line from character > left line mo
            this.y + this.height > mo.y + mo.offset.top && //bottom line from character > top line mo
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && //left line from character < right line mo
            this.y < mo.y + mo.height - mo.offset.bottom; //top line from character < bottom line mo
    }

    isLandingOnTop(enemy) {
        // Prüfe ob Character von oben kommt (fallend)
        let isFalling = this.speedY < 0;

        // Prüfe ob Character über dem Gegner ist
        let isAboveEnemy = this.y + this.height - this.offset.bottom < enemy.y + enemy.offset.top + 100;

        // Prüfe horizontale Überlappung
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
        return passedTime < 0.5;
    }

    isDead() {
        if ((this instanceof Character || this instanceof Endboss) && this.lifepoints == 0 && !this.dead) {
            this.dead = true; // Animation wurde gestartet
            this.startDeadAnimation();
            if (this instanceof Endboss) {
                console.log('🔥 ENDBOSS DEFEATED! 🔥');

                // Boss Fight Music stoppen und Victory Music starten
                if (window.soundManager) {
                    window.soundManager.stopBackgroundMusic();
                    window.soundManager.playSound('endbossDead'); // Neuer Victory Sound
                }

            } else if (this instanceof Character) {
                console.log('💀 Character died - Game Over');

                // Background Music stoppen bei Character-Tod
                if (window.soundManager) {
                    window.soundManager.stopBackgroundMusic();
                    window.soundManager.playSound('dead'); // Game Over Sound
                }
            }
            // this.playSound('dead');
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