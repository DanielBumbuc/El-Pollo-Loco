class MoveableObject extends DrawableObject {
    speed = 0.15;
    lifepoints = 100;
    bottleAmount = 0;
    coinAmount = 0;
    lastHit = 0;
    speedY = 0;
    acceleration = 3;
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
            return this.y < 250;
        }  
    }

    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
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
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
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


    hit() {
        this.lifepoints -= 5;
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
        return this.lifepoints == 0;
    }

    collectBottle() {
        this.bottleAmount += 10;
        if (this.bottleAmount > 100) {
            this.bottleAmount = 100;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectCoin() {
        this.coinAmount += 10;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}