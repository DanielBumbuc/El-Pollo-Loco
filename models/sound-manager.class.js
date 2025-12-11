/**
 * Sound management class for handling all game audio
 * Manages sound registration, playback, volume control, and mobile compatibility
 */
class SoundManager {
    /**
     * Creates a new sound manager instance
     * Initializes sound storage, volume settings, and mute state
     */
    constructor() {
        this.sounds = {};
        this.isMuted = false;
        this.globalVolume = 1;
        this.soundVolumes = {};
    }

    /**
     * Registers a new sound for use in the game
     * @param {string} name - Unique identifier for the sound
     * @param {string} path - File path to the audio file
     * @param {number} volume - Default volume level (0-1)
     */
    registerSound(name, path, volume = 0.5) {
        this.sounds[name] = new Audio(path);
        this.soundVolumes[name] = volume;
        this.updateSoundVolume(name);
    }

    /**
     * Plays a registered sound from the beginning
     * @param {string} name - Name of the sound to play
     * Handles playback promises and fallback for background music
     */
    playSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            const playPromise = this.sounds[name].play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    if (e.name === 'NotAllowedError') {
                        return;
                    }
                    console.warn(`Sound playback failed for ${name}:`, e.message);
                });
            }
        }
    }

    /**
     * Stops a currently playing sound
     * @param {string} name - Name of the sound to stop
     * Pauses playback and resets to beginning
     */
    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }

    /**
     * Sets the volume for a specific sound
     * @param {string} name - Name of the sound
     * @param {number} volume - Volume level (0-1)
     * Updates sound's individual volume and applies it immediately
     */
    setSoundVolume(name, volume) {
        this.soundVolumes[name] = volume;
        this.updateSoundVolume(name);
    }

    /**
     * Updates the actual volume of a sound based on global and individual settings
     * @param {string} name - Name of the sound to update
     * Calculates final volume from mute state, global volume, and sound-specific volume
     */
    updateSoundVolume(name) {
        if (this.sounds[name]) {
            const finalVolume = this.isMuted ? 0 : (this.soundVolumes[name] * this.globalVolume);
            this.sounds[name].volume = finalVolume;
        }
    }

    /**
     * Sets the global volume level for all sounds
     * @param {number} volume - Global volume level (0-1)
     * Affects all sounds by multiplying with their individual volumes
     */
    setGlobalVolume(volume) {
        this.globalVolume = volume;
        this.updateAllVolumes();
    }

    /**
     * Mutes or unmutes all sounds
     * @param {boolean} muted - true to mute, false to unmute
     * Updates all sound volumes when mute state changes
     */
    setMuted(muted) {
        this.isMuted = muted;
        this.updateAllVolumes();
    }

    /**
     * Toggles the current mute state
     * Switches between muted and unmuted states
     */
    toggleMute() {
        this.setMuted(!this.isMuted);
    }

    /**
     * Updates the volume for all registered sounds
     * Recalculates and applies volume settings to every sound
     */
    updateAllVolumes() {
        for (let name in this.sounds) {
            this.updateSoundVolume(name);
        }
    }

    /**
     * Returns the current mute status
     * @returns {boolean} True if sounds are muted, false otherwise
     */
    getMuted() {
        return this.isMuted;
    }

    /**
     * Returns the current global volume level
     * @returns {number} Current global volume (0-1)
     */
    getGlobalVolume() {
        return this.globalVolume;
    }

    /**
     * Initializes all default sounds for the game
     * Registers all game sounds with appropriate volume levels and sets background music to loop
     */
    initializeGameSounds() {
        this.registerSound('jump', './audio/swing-whoosh-110410.mp3', 0.3);
        this.registerSound('coin', './audio/money-pickup-2-89563.mp3', 0.3);
        this.registerSound('bottle', './audio/health-pickup-6860.mp3', 0.3);
        this.registerSound('hit', './audio/hitHurt.wav', 0.3);
        this.registerSound('throw', './audio/air-whoosh-380651.mp3', 0.3);
        this.registerSound('dead', './audio/ouchmp3-14591.mp3', 0.3);
        this.registerSound('chicken', './audio/chicken_sound.wav', 0.3);
        this.registerSound('endboss', './audio/chiken-sound-370337.mp3', 0.3);
        this.registerSound('endbossDead', './audio/female-character-death-vocal-9-408428.mp3', 0.6);
        this.registerSound('bossFightMusic', './audio/cowboy-western-background-247644.mp3', 0.3);
        this.registerSound('backgroundMusic', './audio/the-russian-gunfighter-western-movie-instrumental-286601.mp3', 0.3);
        if (this.sounds['backgroundMusic']) {
            this.sounds['backgroundMusic'].loop = true;
        }
    }

    /**
     * Plays background music with error handling and fallback retry
     * Stops any current background music before starting new track
     */
    playBackgroundMusic() {
        this.stopBackgroundMusic();
        setTimeout(() => {
            if (this.sounds['backgroundMusic']) {
                const playPromise = this.sounds['backgroundMusic'].play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        if (error.name === 'NotAllowedError') {
                            return;
                        }
                        console.warn('Background music could not start:', error);
                        this.retryBackgroundMusic();
                    });
                }
            }
        }, 50);
    }

    /**
     * Fallback retry mechanism for background music playback
     * Attempts to restart background music after a brief delay for mobile compatibility
     */
    retryBackgroundMusic() {
        setTimeout(() => {
            this.sounds['backgroundMusic'].play().catch(() => {
            });
        }, 100);
    }

    /**
     * Stops all background music including boss fight music
     * Ensures no background tracks are playing simultaneously
     */
    stopBackgroundMusic() {
        this.stopSound('backgroundMusic');
        this.stopSound('bossFightMusic');
    }

    /**
     * Checks if background music is currently playing
     * @returns {boolean} True if background music is playing, false otherwise
     */
    isBackgroundMusicPlaying() {
        const bgMusic = this.sounds['backgroundMusic'];
        return bgMusic && !bgMusic.paused && bgMusic.currentTime > 0;
    }

    /**
     * Activates audio context for mobile browsers after user interaction
     * This method should be called after a user interaction to enable audio on mobile
     */
    activateAudioContext() {
        Object.values(this.sounds).forEach(audio => {
            if (audio.paused) {
                this.activateSingleAudio(audio);
            }
        });
    }

    /**
     * Activates a single audio element for mobile compatibility
     * @param {HTMLAudioElement} audio - The audio element to activate
     * Briefly plays audio at minimal volume to unlock audio context
     */
    activateSingleAudio(audio) {
        const originalVolume = audio.volume;
        audio.volume = 0.001;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = originalVolume;
            }).catch(() => {
                audio.volume = originalVolume;
            });
        }
    }
}

window.soundManager = new SoundManager();