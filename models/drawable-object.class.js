class DrawableObject {
    x = 100;
    y = 250;
    speed = 4;
    height = 170;
    width = 80;
    img;
    imageCache = {};
    currentImage = 0;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        // if (this instanceof Endboss) {d
        //     ctx.beginPath();
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }

        // if (this instanceof Bottle) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '2';
        //     ctx.strokeStyle = 'red';
        //     ctx.rect(
        //         this.x + 20, 
        //         this.y + 80, 
        //         this.width - 40, 
        //         this.height - 90
        //     );
        //     ctx.stroke();
        // }
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveStatusbar() {
        this.x -= this.speed;
    }
}