let canvas;
let world;
let keyboard = new Keyboard();
let activeButton = false;

function startGame() {
    if (world) {
        // Play-Button ausblenden
        document.getElementById('playButton').classList.add('d-none');

        // Level laden
        loadLevel1();
        world.level = level1;

        // Spiel starten
        world.gameState = true;
        world.startGame();
    }
}

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
    
    // StartScreen initialisieren
    initStartScreen();
}

function initStartScreen() {
    // Enter-Taste zum Starten des Spiels
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !world.gameState) {
            startGame();
        }
    });
}

function toggleVolumeImg() {
    if (world) {
        world.toggleVolumeImg();
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