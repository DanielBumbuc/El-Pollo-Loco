class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
        this.globalVolume = 1;
        this.soundVolumes = {}; // Individuelle Lautstärken für jeden Sound
    }

    /**
     * Registriert einen neuen Sound
     * @param {string} name - Name des Sounds
     * @param {string} path - Pfad zur Audio-Datei
     * @param {number} volume - Standard-Lautstärke (0-1)
     */
    registerSound(name, path, volume = 0.5) {
        this.sounds[name] = new Audio(path);
        this.soundVolumes[name] = volume;
        this.updateSoundVolume(name);
    }

    /**
     * Spielt einen Sound ab
     * @param {string} name - Name des Sounds
     */
    playSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            this.sounds[name].play().catch(e => {
                console.log('Sound konnte nicht abgespielt werden:', e);
            });
        }
    }

    /**
     * Stoppt einen Sound
     * @param {string} name - Name des Sounds
     */
    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }

    /**
     * Setzt die Lautstärke für einen bestimmten Sound
     * @param {string} name - Name des Sounds
     * @param {number} volume - Lautstärke (0-1)
     */
    setSoundVolume(name, volume) {
        this.soundVolumes[name] = volume;
        this.updateSoundVolume(name);
    }

    /**
     * Aktualisiert die tatsächliche Lautstärke eines Sounds
     * @param {string} name - Name des Sounds
     */
    updateSoundVolume(name) {
        if (this.sounds[name]) {
            const finalVolume = this.isMuted ? 0 : (this.soundVolumes[name] * this.globalVolume);
            this.sounds[name].volume = finalVolume;
        }
    }

    /**
     * Setzt die globale Lautstärke für alle Sounds
     * @param {number} volume - Globale Lautstärke (0-1)
     */
    setGlobalVolume(volume) {
        this.globalVolume = volume;
        this.updateAllVolumes();
    }

    /**
     * Mutet oder entmutet alle Sounds
     * @param {boolean} muted - true = muten, false = entmuten
     */
    setMuted(muted) {
        this.isMuted = muted;
        this.updateAllVolumes();
    }

    /**
     * Togglet den Mute-Status
     */
    toggleMute() {
        this.setMuted(!this.isMuted);
    }

    /**
     * Aktualisiert die Lautstärke aller registrierten Sounds
     */
    updateAllVolumes() {
        for (let name in this.sounds) {
            this.updateSoundVolume(name);
        }
    }

    /**
     * Gibt den aktuellen Mute-Status zurück
     * @returns {boolean}
     */
    getMuted() {
        return this.isMuted;
    }

    /**
     * Gibt die aktuelle globale Lautstärke zurück
     * @returns {number}
     */
    getGlobalVolume() {
        return this.globalVolume;
    }

    /**
     * Initialisiert alle Standard-Sounds für das Spiel
     */
    initializeGameSounds() {
        this.registerSound('jump', '../audio/swing-whoosh-110410.mp3', 0.3);
        this.registerSound('coin', '../audio/money-pickup-2-89563.mp3', 0.3);
        this.registerSound('bottle', '../audio/health-pickup-6860.mp3', 0.3);
        this.registerSound('hit', '../audio/hitHurt.wav', 0.3);
        this.registerSound('throw', '../audio/air-whoosh-380651.mp3', 0.3);
        // this.registerSound('walking', '../audio/running-in-grass-6237.mp3', 0.3);
        this.registerSound('dead', '../audio/ouchmp3-14591.mp3', 0.3);
        this.registerSound('chicken', '../audio/chicken_sound.wav', 0.3);
        
        // Background Music hinzufügen
        this.registerSound('backgroundMusic', '../audio/funk-lead-loop-71557.mp3', 0.3);
        if (this.sounds['backgroundMusic']) {
            this.sounds['backgroundMusic'].loop = true;
        }
    }

    /**
     * Spielt die Background Music ab
     */
    playBackgroundMusic() {
        this.stopBackgroundMusic(); // Erst stoppen falls bereits läuft
        this.playSound('backgroundMusic');
        console.log('Background music started via SoundManager');
    }

    /**
     * Stoppt die Background Music
     */
    stopBackgroundMusic() {
        this.stopSound('backgroundMusic');
        console.log('Background music stopped via SoundManager');
    }

    /**
     * Prüft ob Background Music läuft
     * @returns {boolean}
     */
    isBackgroundMusicPlaying() {
        const bgMusic = this.sounds['backgroundMusic'];
        return bgMusic && !bgMusic.paused && bgMusic.currentTime > 0;
    }
}

// Globale Sound-Manager-Instanz
window.soundManager = new SoundManager();