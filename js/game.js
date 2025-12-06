let canvas;
let world;
let keyboard = new Keyboard();
let activeButton = false;
let resizeTimeout;

function startGame() {
    if (world) {
        document.getElementById('playButton').classList.add('d-none');
        if (window.innerWidth <= 935) {
            document.getElementById('upperBtnContainer').classList.remove('d-none');
            document.getElementById('playBtnContainer').classList.remove('d-none');
        } else {
            document.getElementById('upperBtnContainer').classList.add('d-none');
            document.getElementById('playBtnContainer').classList.add('d-none');
        }
        loadLevel1();
        world.level = level1;
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
    initStartScreen();
    setSavedVolumeIcon();
    updateMobileVolumeIcon();
    world.loadSavedSettings();
    checkOrientation();
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
}

function initStartScreen() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !world.gameState) {
            startGame();
        }
    });
}

function resetGame() {
    if (window.soundManager) {
        window.soundManager.stopBackgroundMusic();
    }
    clearAllIntervals();
    world = null;
    world = new World(canvas, keyboard);
    world.gameState = false;
    document.getElementById('playButton').classList.remove('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
}

function clearAllIntervals() {
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
    document.querySelectorAll('.western-button').forEach(btn => {
        btn.classList.remove('active');
    });
    element.classList.add('active');
    if (element.classList.contains('volume-btn')) {
        toggleVolumeImg();
    }
}

function setSavedVolumeIcon() {
    let volumeBtn = document.getElementById('volumeButton');
    let volumeOnIcon = document.getElementById('volumeOnIcon');
    let volumeOffIcon = document.getElementById('volumeOffIcon');
    let savedMuted = localStorage.getItem('gameMuted');
    if (savedMuted === 'true') {
        volumeBtn.classList.remove('active');
        volumeOnIcon.classList.add('d-none');
        volumeOffIcon.classList.remove('d-none');
        window.soundManager.isMuted = true;
    } else if (savedMuted === 'false') {
        volumeBtn.classList.add('active');
        volumeOnIcon.classList.remove('d-none');
        volumeOffIcon.classList.add('d-none');
        window.soundManager.isMuted = false;
    }
}

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
        checkOrientation();
    }, 150);
}

function handleWindowResize() {
    if (world && world.gameState) {
        if (window.innerWidth > 935) {
            document.getElementById('upperBtnContainer').classList.add('d-none');
            document.getElementById('playBtnContainer').classList.add('d-none');
        } else {
            document.getElementById('upperBtnContainer').classList.remove('d-none');
            document.getElementById('playBtnContainer').classList.remove('d-none');
        }
    }
}

function checkOrientation() {
    const orientationWarning = document.getElementById('orientationWarning');
    if (window.innerWidth <= 935 && window.innerHeight > window.innerWidth) {
        orientationWarning.classList.remove('d-none');
        console.log('Portrait mode detected - showing rotation warning');
    } else {
        orientationWarning.classList.add('d-none');
        console.log('Landscape mode or desktop - hiding rotation warning');
    }
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})

document.addEventListener('touchstart', (e) => {
    keyboard.handleTouchStart(e);
});

document.addEventListener('touchend', (e) => {
    keyboard.handleTouchEnd(e);
});

window.addEventListener('resize', debouncedResize);

window.addEventListener('orientationchange', () => {
    setTimeout(checkOrientation, 200);
});