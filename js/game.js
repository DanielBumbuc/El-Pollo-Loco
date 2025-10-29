let canvas;
let world;
let keyboard = new Keyboard();
let activeButton = false;

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

function activeControlButton(element) {
    // Alle Buttons zurücksetzen
    document.querySelectorAll('.western-button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Aktuellen Button aktivieren
    element.classList.add('active');
    
    // Spezifische Aktionen
    if (element.classList.contains('settings-btn')) {
        // Settings-Panel öffnen/schließen
        
    } else if (element.classList.contains('volume-btn')) {
        toggleVolumeImg();
    }
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})