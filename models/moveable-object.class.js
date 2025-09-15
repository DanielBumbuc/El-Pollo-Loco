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
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
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
                if (this.y > this.onGroundY) {
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

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
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
    }

    calcJumpDuration() {
        if (!this.isAboveGround() && this.jumpStartTime && !this.jumpEndTime) {
            this.jumpEndTime = Date.now();
            this.jumpDuration = this.jumpEndTime - this.jumpStartTime;
            this.jumpStartTime = null; // Optional: zurücksetzen, wenn Sprung vorbei
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
        console.log(this.dead);
        this.deadAnimationInterval = setInterval(() => {
        if (frame < this.IMAGES_DEAD.length && this.dead === true) {
            this.img = this.imageCache[this.IMAGES_DEAD[frame]];
            frame++;
            console.log(frame);
            
        } 
        else {
            clearInterval(this.deadAnimationInterval);
            this.deadAnimationDone = true;
        }
    }, 120); // Geschwindigkeit anpassen
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

    hit(damage) {
        this.lifepoints -= damage;
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
        if (this instanceof Character && this.lifepoints == 0 && !this.dead) {
            this.dead = true; // Animation wurde gestartet
            this.startDeadAnimation();
        }
        return this.lifepoints == 0;
    }

    collectBottle() {
        this.bottleAmount += 10;
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        }
    }

    collectCoin() {
        this.coinAmount += 10;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }
}