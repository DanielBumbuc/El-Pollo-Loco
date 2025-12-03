let canvas;
let world;
let keyboard = new Keyboard();
let activeButton = false;
let resizeTimeout;

function startGame() {
    if (world) {
        // Play-Button ausblenden
        document.getElementById('playButton').classList.add('d-none');

        if (window.innerWidth <= 935) {
            document.getElementById('upperBtnContainer').classList.remove('d-none');
            document.getElementById('playBtnContainer').classList.remove('d-none');
        } else {
            document.getElementById('upperBtnContainer').classList.add('d-none');
            document.getElementById('playBtnContainer').classList.add('d-none');
        }

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
    if (window.soundManager) {
        window.soundManager.initializeGameSounds();
    }
    world = new World(canvas, keyboard);
    keyboard.onBottleThrow = () => {
        world.checkThrowObjects();
    };

    // StartScreen initialisieren
    initStartScreen();
    console.log(window.soundManager.isMuted);
    setSavedVolumeIcon();
    updateMobileVolumeIcon();
    world.loadSavedSettings();

    // ENTFERNT: Background Music bei init() - Mobile Browser blockieren das
    // Music wird erst bei startGame() nach User-Interaction gestartet
    console.log('Init complete - Background music will start after user interaction');
}

function initStartScreen() {
    // Enter-Taste zum Starten des Spiels
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !world.gameState) {
            startGame();
        }
    });
}

function resetGame() {
    // Background Music über SoundManager stoppen
    if (window.soundManager) {
        window.soundManager.stopBackgroundMusic();
        console.log('Background music stopped via SoundManager');
    }

    // Alle Intervalle stoppen
    clearAllIntervals();

    // World zurücksetzen
    world = null;

    // Neue World erstellen
    world = new World(canvas, keyboard);

    // Zurück zum Startscreen
    world.gameState = false;
    document.getElementById('playButton').classList.remove('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
    console.log('Game reset complete');
}

function clearAllIntervals() {
    // Alle aktiven Intervalle stoppen
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
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

function setSavedVolumeIcon() {
    let volumeBtn = document.getElementById('volumeButton');
    let volumeOnIcon = document.getElementById('volumeOnIcon');
    let volumeOffIcon = document.getElementById('volumeOffIcon');
    let savedMuted = localStorage.getItem('gameMuted');
    if (savedMuted === 'true') {
        // Sound icon stumm schalten
        volumeBtn.classList.remove('active');
        volumeOnIcon.classList.add('d-none');
        volumeOffIcon.classList.remove('d-none');
        window.soundManager.isMuted = true;
    } else if (savedMuted === 'false') {
        // Sound iocn wieder anschalten
        volumeBtn.classList.add('active');
        volumeOnIcon.classList.remove('d-none');
        volumeOffIcon.classList.add('d-none');
        window.soundManager.isMuted = false;
    }
}

// Mobile Volume Icon Update
function updateMobileVolumeIcon() {
    const mobileVolumeOnIcon = document.getElementById('mobileVolumeOnIcon');
    const mobileVolumeOffIcon = document.getElementById('mobileVolumeOffIcon');

    if (window.soundManager && window.soundManager.isMuted) {
        mobileVolumeOnIcon.classList.add('d-none');
        mobileVolumeOffIcon.classList.remove('d-none');
    } else {
        mobileVolumeOnIcon.classList.remove('d-none');
        mobileVolumeOffIcon.classList.add('d-none');
    }
}

function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleWindowResize();
    }, 150); // 150ms Verzögerung
}

function handleWindowResize() {
    console.log(window.innerWidth);
    
    if (window.innerWidth > 935) {
        document.getElementById('upperBtnContainer').classList.add('d-none');
        document.getElementById('playBtnContainer').classList.add('d-none');
    } else {
        document.getElementById('upperBtnContainer').classList.remove('d-none');
        document.getElementById('playBtnContainer').classList.remove('d-none');
    }
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})

// Touch-Events für Mobile Play Buttons - Kompakte Version
document.addEventListener('touchstart', (e) => {
    keyboard.handleTouchStart(e);
});

document.addEventListener('touchend', (e) => {
    keyboard.handleTouchEnd(e);
});

window.addEventListener('resize', debouncedResize);