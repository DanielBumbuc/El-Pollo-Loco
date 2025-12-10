/**
 * Keyboard input handler class for managing game controls
 * Handles both keyboard input and touch controls for mobile devices
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ENTER = false;
    D = false;

    /**
     * Creates a new keyboard input handler
     */
    constructor() {

    }

    /**
     * Handles keyboard key press events and activates corresponding input flags
     * @param {string} pressedKey - The key code of the pressed key
     * Maps arrow keys, space, enter, and D key to game controls
     */
    handleKeydown(pressedKey) {
        if (pressedKey == 'ArrowLeft') this.LEFT = true;
        if (pressedKey == 'ArrowRight') this.RIGHT = true;
        if (pressedKey == 'ArrowUp') this.UP = true;
        if (pressedKey == 'ArrowDown') this.DOWN = true;
        if (pressedKey == 'Space') this.SPACE = true;
        if (pressedKey == 'Enter') this.ENTER = true;
        if (pressedKey == 'KeyD' && !this.D) {
        this.D = true;
        if (typeof this.onBottleThrow === 'function') {
            this.onBottleThrow();
        }
    }    
    }

    /**
     * Handles keyboard key release events and deactivates corresponding input flags
     * @param {string} pressedKey - The key code of the released key
     * Resets input flags when keys are released
     */
    handleKeyup(pressedKey) {
        if (pressedKey == 'ArrowLeft') this.LEFT = false;
        if (pressedKey == 'ArrowRight') this.RIGHT = false;
        if (pressedKey == 'ArrowUp') this.UP = false;
        if (pressedKey == 'ArrowDown') this.DOWN = false;
        if (pressedKey == 'Space') this.SPACE = false; 
        if (pressedKey == 'Enter') this.ENTER = false;
        if (pressedKey == 'KeyD')  this.D = false;
    }

    /**
     * Handles touch start events for mobile control buttons
     * @param {TouchEvent} e - The touch event object
     * Maps mobile button touches to keyboard equivalents and provides visual feedback
     */
    handleTouchStart(e) {
        const button = e.target.closest('button');
        if (!button) return;
        e.preventDefault();
        button.style.opacity = '1'; 
        switch (button.id) {
            case 'leftArrowBtn':
                this.LEFT = true;
                break;
            case 'rightArrowBtn':
                this.RIGHT = true;
                break;
            case 'jumpBtn':
                this.UP = true;
                break;
            case 'throwBtn':
                this.D = true;
                if (typeof this.onBottleThrow === 'function') {
                    this.onBottleThrow();
                }
                break;
            case 'mobileRestartBtn':
                break;
            case 'mobileVolumeBtn':
                break;
        }
    }

    /**
     * Handles touch end events for mobile control buttons
     * @param {TouchEvent} e - The touch event object
     * Deactivates input flags and handles special button actions like restart and volume
     */
    handleTouchEnd(e) {
        const button = e.target.closest('button');
        if (!button) return;
        e.preventDefault();
        button.style.opacity = '0.8';
        switch (button.id) {
            case 'leftArrowBtn':
                this.LEFT = false;
                break;
            case 'rightArrowBtn':
                this.RIGHT = false;
                break;
            case 'jumpBtn':
                this.UP = false;
                break;
            case 'throwBtn':
                this.D = false;
                break;
            case 'mobileVolumeBtn':
                if (typeof window.toggleVolumeImg === 'function') {
                    window.toggleVolumeImg();
                }
                if (typeof window.updateMobileVolumeIcon === 'function') {
                    window.updateMobileVolumeIcon();
                }
                break;
        }
    }
    
}