/**
 * Status bar class for displaying health, coins, bottles, and endboss health
 * Extends DrawableObject to show visual progress bars with different types
 */
class Statusbar extends DrawableObject {
    world;
    height = 40;
    width = 150;

    IMAGES_LIFEPOINTS = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_LIFEPOINTS_ENDBOSS = [
        '../img/7_statusbars/2_statusbar_endboss/green/green0.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green20.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green40.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green60.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green80.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    IMAGES_COINS = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLES = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates a status bar of specified type with position and initial percentage
     * @param {string} type - Type of status bar ('lifepoints', 'coins', 'bottles', 'endboss')
     * @param {number} x - Horizontal position of the status bar
     * @param {number} y - Vertical position of the status bar
     * @param {number} percentage - Initial percentage value (0-100)
     */
    constructor(type, x, y, percentage) {
        super();
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.types = {
            lifepoints: this.IMAGES_LIFEPOINTS,
            coins: this.IMAGES_COINS,
            bottles: this.IMAGES_BOTTLES,
            endboss: this.IMAGES_LIFEPOINTS_ENDBOSS
        };
        this.type = type;
        this.images = this.types[type];
        this.loadImages(this.images);
        this.setPercentage(percentage);
    }

    /**
     * Sets the status bar to display a specific percentage value
     * @param {number} percentage - The percentage to display (0-100)
     * Updates the displayed image based on the percentage value
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image index to use based on current percentage
     * @returns {number} Image index (0-5) corresponding to percentage ranges
     * Maps percentage ranges to appropriate status bar fill levels
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Animates the status bar sliding in from right to left
     * Continuously moves the status bar until it reaches position x=540
     */
    animateStatusbar() {
        let statusbarInterval = setInterval(() => {
            this.moveStatusbar();
            if (this.x <= 540) {
                clearInterval(statusbarInterval);
            }
        }, 1000 / 60);
        
    }
}