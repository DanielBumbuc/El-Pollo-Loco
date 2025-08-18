class Background extends MoveableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 480 - this.height;

    constructor(imagePath, x) {
        super();
        this.loadImg(imagePath);
        this.x = x;
    }

}