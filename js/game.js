let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
    
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})