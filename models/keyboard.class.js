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
        if (pressedKey == 'KeyD') this.D = true;
        
    }

    handleKeyup(pressedKey) {
        if (pressedKey == 'ArrowLeft') this.LEFT = false;
        if (pressedKey == 'ArrowRight') this.RIGHT = false;
        if (pressedKey == 'ArrowUp') this.UP = false;
        if (pressedKey == 'ArrowDown') this.DOWN = false;
        if (pressedKey == 'Space') this.SPACE = false; 
        if (pressedKey == 'Enter') this.ENTER = true;
        if (pressedKey == 'KeyD') this.D = false; 
    }
    
}