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

function startGame() {
    if (world) {
        // Play-Button ausblenden
        document.getElementById('playButton').classList.add('d-none');
        
        // Spiel starten
        world.gameState = true;
        world.startGame();
    }
}

function activeControlButton(element) {
    let savedMuted = localStorage.getItem('gameMuted');

    // Alle Buttons zurücksetzen
    document.querySelectorAll('.western-button').forEach(btn => {
        btn.classList.remove('active');
    });

    if (savedMuted === 'true') {
        console.log(savedMuted);
        
    }
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