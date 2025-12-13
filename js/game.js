let canvas;
let world;
let keyboard = new Keyboard();
let activeButton = false;
let resizeTimeout;

/**
 * Starts the game by initializing level, showing mobile controls, and beginning gameplay
 * Handles UI visibility based on screen size and activates game state
 */
function startGame() {
    if (world) {
        document.getElementById('playButton').classList.add('d-none');
        if (window.innerWidth <= 935 || isTablet()) { 
            removeContainerElements();
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

/**
 * Removes d-none class from mobile UI containers and buttons
 * Shows mobile controls including upper button container, play button container,
 * mobile home button, and mobile restart button for touch devices
 */
function removeContainerElements() {
    document.getElementById('upperBtnContainer').classList.remove('d-none');
    document.getElementById('playBtnContainer').classList.remove('d-none');
    document.getElementById('mobileHomeBtn').classList.remove('d-none');
    document.getElementById('mobileRestartBtn').classList.remove('d-none');
}

/**
 * Initializes the game canvas, sound system, world instance, and event listeners
 * Sets up keyboard controls, start screen, volume settings, and mobile compatibility
 */
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
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
}

/**
 * Sets up keyboard event listener for Enter key to start game from start screen
 * Enables starting game with keyboard input when not in active gameplay
 */
function initStartScreen() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !world.gameState) {
            startGame();
        }
    });
}

/**
 * Resets the entire game to initial state
 * Stops audio, clears intervals, recreates world instance, and resets UI elements
 */
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
    document.getElementById('homeButton').classList.add('d-none');
    document.getElementById('mobileHomeBtn').classList.add('d-none');
    document.getElementById('mobileRestartBtn').classList.add('d-none');
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
    startGame();
}

/**
 * Returns to home/start screen by stopping the game and resetting UI
 * Stops audio, clears intervals, resets world state, and shows start screen
 */
function goHome() {
    if (window.soundManager) {
        window.soundManager.stopBackgroundMusic();
    }
    clearAllIntervals();
    world = null;
    world = new World(canvas, keyboard);
    world.gameState = false;
    document.getElementById('playButton').classList.remove('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('homeButton').classList.add('d-none');
    document.getElementById('mobileHomeBtn').classList.add('d-none');
    document.getElementById('mobileRestartBtn').classList.add('d-none');
    document.getElementById('upperBtnContainer').classList.add('d-none');
    document.getElementById('playBtnContainer').classList.add('d-none');
    initStartScreen();
}

/**
 * Clears all active intervals to prevent memory leaks and stop game loops
 * Iterates through interval IDs and clears each one systematically
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Toggles volume icon display between muted and unmuted states
 * Delegates to world instance if available for volume control
 */
function toggleVolumeImg() {
    if (world) {
        world.toggleVolumeImg();
    }
}

/**
 * Activates a control button and deactivates all others
 * @param {HTMLElement} element - The button element to activate
 * Handles button styling and triggers volume toggle for volume buttons
 */
function activeControlButton(element) {
    document.querySelectorAll('.western-button').forEach(btn => {
        btn.classList.remove('active');
    });
    element.classList.add('active');
    if (element.classList.contains('volume-btn')) {
        toggleVolumeImg();
    }
}

/**
 * Sets the volume icon state based on saved localStorage settings
 * Restores volume button appearance and sound manager mute state from previous session
 */
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

/**
 * Updates mobile volume icon display based on current mute state
 * Synchronizes mobile volume button appearance with sound manager mute status
 */
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

/**
 * Debounces window resize events to prevent excessive function calls
 * Uses timeout to delay resize handling until user stops resizing window
 */
function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleWindowResize();
        checkOrientation();
    }, 150);
}

/**
 * Handles window resize events by showing or hiding mobile controls
 * Adjusts UI visibility based on screen width and current game state
 */
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

/**
 * Checks device orientation and shows rotation warning for mobile portrait mode
 * Displays warning overlay when mobile device is in portrait orientation
 */
function checkOrientation() {
    const orientationWarning = document.getElementById('orientationWarning');
    if (window.innerWidth <= 935 && window.innerHeight > window.innerWidth) {
        orientationWarning.classList.remove('d-none');
    } else {
        orientationWarning.classList.add('d-none');
    }
}

/**
 * Detects if the current device is a tablet based on screen size and touch capability
 * @returns {boolean} True if device is detected as tablet
 */
function isTablet() {
    const userAgent = navigator.userAgent;
    const screenWidth = window.innerWidth;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // iPad specific detection (auch iPad Mini)
    const isIPad = /iPad|Macintosh/i.test(userAgent) && hasTouchScreen;
    
    // Android tablet detection
    const isAndroidTablet = /Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
    
    // Size-based detection für iPad Mini (768px - 1024px mit Touch)
    const isTabletSize = (screenWidth >= 768 && screenWidth <= 1024) && hasTouchScreen;
    
    return isIPad || isAndroidTablet || isTabletSize;
}

document.addEventListener('keydown', (e) => {
    keyboard.handleKeydown(e.code);
})

document.addEventListener('keyup', (e) => {
    keyboard.handleKeyup(e.code);
})

document.addEventListener('touchstart', (e) => {
    keyboard.handleTouchStart(e);
}, { passive: false });

document.addEventListener('touchend', (e) => {
    keyboard.handleTouchEnd(e);
}, { passive: false });

window.addEventListener('resize', debouncedResize);

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        checkOrientation();
        if (world && world.gameState) {
            if (window.innerWidth <= 935 || isTablet()) {
                removeContainerElements();
            } else {
                document.getElementById('upperBtnContainer').classList.add('d-none');
                document.getElementById('playBtnContainer').classList.add('d-none');
            }
        }
    }, 200);
});