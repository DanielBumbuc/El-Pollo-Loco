let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keyboard.onBottleThrow = () => {
        world.checkThrowObjects();
    };
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})