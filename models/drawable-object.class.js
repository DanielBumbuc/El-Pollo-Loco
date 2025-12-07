/**
 * Base class for all drawable objects in the game
 * Provides fundamental drawing, image loading, and frame rendering capabilities
 */
class DrawableObject {
    x = 100;
    y = 150;
    speed = 4;
    height = 300;
    width = 140;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Draws the object on the canvas using its current image and dimensions
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws collision frames for debugging purposes (currently commented out)
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * Used for visualizing collision boundaries during development
     */
    drawFrame(ctx) {
        // if (this instanceof ChickenSmall) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }

        // if (this instanceof Chicken) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '2';
        //     ctx.strokeStyle = 'red';
        //     ctx.rect(
        //         this.x + this.offset.left,
        //         this.y + this.offset.top,
        //         this.width - this.offset.left - this.offset.right,
        //         this.height - this.offset.top - this.offset.bottom
        //     );
        //     ctx.stroke();
        // }
    }

    /**
     * Loads a single image from the specified path
     * @param {string} path - The path to the image file
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache for animations
     * @param {string[]} arr - Array of image paths to load
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Moves the object leftward (used for status bars and moving objects)
     */
    moveStatusbar() {
        this.x -= this.speed;
    }
}