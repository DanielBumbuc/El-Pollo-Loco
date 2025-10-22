let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    
    // SoundManager initialisieren
    if (window.soundManager) {
        window.soundManager.initializeGameSounds();
    }
    
    world = new World(canvas, keyboard);
    keyboard.onBottleThrow = () => {
        world.checkThrowObjects();
    };
}

function toggleVolumeImg() {
    if (world) {
        world.toggleVolumeImg();
    }
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})