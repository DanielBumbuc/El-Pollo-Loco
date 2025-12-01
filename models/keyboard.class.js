class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ENTER = false;
    D = false;

    constructor() {
        


    }

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

    handleKeyup(pressedKey) {
        if (pressedKey == 'ArrowLeft') this.LEFT = false;
        if (pressedKey == 'ArrowRight') this.RIGHT = false;
        if (pressedKey == 'ArrowUp') this.UP = false;
        if (pressedKey == 'ArrowDown') this.DOWN = false;
        if (pressedKey == 'Space') this.SPACE = false; 
        if (pressedKey == 'Enter') this.ENTER = false;
        if (pressedKey == 'KeyD')  this.D = false;
    }

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
                // Restart bei touchend
                break;
            case 'mobileVolumeBtn':
                // Volume bei touchend
                break;
        }
    }

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
            case 'mobileRestartBtn':
                if (typeof window.resetGame === 'function') {
                    window.resetGame();
                }
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