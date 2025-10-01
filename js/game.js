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

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        if (character.sounds.walking.paused) {
            character.sounds.walking.currentTime = 0;
            character.sounds.walking.loop = true;
            character.sounds.walking.playSound('walking');
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        character.sounds.walking.pause();
        character.sounds.walking.currentTime = 0;
    }
});