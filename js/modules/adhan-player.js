/**
 * Adhan Player
 * Handles playing Adhan audio files
 */
export class AdhanPlayer {
    /**
     * Constructor
     */
    constructor() {
        this.audio = null;
        this.qaris = this.loadQariList();
        this.currentPrayer = null;
        this.currentQari = null;
        this.audioContext = null;
        this.audioInitialized = false;
        
        // Initialize
        this.initialize();
    }
    
    /**
     * Initialize the Adhan player
     */
    initialize() {
        try {
            // Create audio element
            this.audio = new Audio();
            
            // Set up event listeners
            this.audio.addEventListener('ended', () => this.onAdhanEnded());
            this.audio.addEventListener('error', (e) => this.onAdhanError(e));
            this.audio.addEventListener('canplaythrough', () => {
                console.log('Audio can play through successfully');
            });
            this.audio.addEventListener('loadeddata', () => {
                console.log('Audio data loaded successfully');
            });
            
            // Initialize Web Audio API context (needed for iOS)
            this.initAudioContext();
            
            // Populate Qari select dropdowns
            this.populateQariSelects();
            
            console.log('Adhan player initialized');
            this.audioInitialized = true;
        } catch (error) {
            console.error('Error initializing Adhan player:', error);
            this.audioInitialized = false;
        }
    }
    
    /**
     * Initialize Web Audio API context (needed for iOS)
     */
    initAudioContext() {
        try {
            // Create AudioContext (with fallbacks for different browsers)
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            console.log('AudioContext initialized:', this.audioContext.state);
            
            // Resume AudioContext on user interaction (required by browsers)
            document.addEventListener('click', () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        console.log('AudioContext resumed successfully');
                    });
                }
            }, { once: true });
        } catch (error) {
            console.error('Error initializing AudioContext:', error);
        }
    }
    
    /**
     * Load the list of available Qaris
     * @returns {Array} List of Qari objects
     */
    loadQariList() {
        // Check if files exist and log their paths
        const basePath = './assets/adhans/';
        console.log('Loading Qari list with base path:', basePath);
        
        return [
            { id: 'adhan1', name: 'Adhan 1', path: basePath + 'default/adhan1.mp3', fajrPath: basePath + 'default/adhan_fajr.mp3' },
            { id: 'adhan2', name: 'Adhan 2', path: basePath + 'default/adhan2.mp3', fajrPath: basePath + 'default/adhan_fajr.mp3' },
            { id: 'adhan3', name: 'Adhan 3', path: basePath + 'default/adhan3.mp3', fajrPath: basePath + 'default/adhan_fajr.mp3' },
            { id: 'adhan', name: 'Adhan (Full)', path: basePath + 'default/adhan.mp3', fajrPath: basePath + 'default/fajr.mp3' },
            { id: 'madinah', name: 'Madinah Adhan', path: basePath + 'madinah/adhan_madinah1.mp3', fajrPath: basePath + 'madinah/fajr_adhan.mp3' },
            { id: 'madina', name: 'Madina Adhan', path: basePath + 'default/madina_adhan.mp3', fajrPath: basePath + 'madinah/fajr_adhan.mp3' },
            { id: 'makkah1', name: 'Makkah Adhan 1', path: basePath + 'makkah/adhan_makkah1.mp3', fajrPath: basePath + 'default/adhan_fajr.mp3' },
            { id: 'makkah2', name: 'Makkah Adhan 2', path: basePath + 'makkah/adhan_makkah2.mp3', fajrPath: basePath + 'default/adhan_fajr.mp3' },
            { id: 'makkah', name: 'Makkah Adhan (Full)', path: basePath + 'makkah/makkah_adhan.mp3', fajrPath: basePath + 'default/fajr.mp3' },
            // Add a fallback option that uses the Local directory
            { id: 'fallback', name: 'Default Adhan', path: basePath + 'Local/default-azan.mp3', fajrPath: basePath + 'Local/default-azanfajr.mp3' }
        ];
    }
    
    /**
     * Populate Qari select dropdowns
     */
    populateQariSelects() {
        try {
            const qariSelects = document.querySelectorAll('.qari-select');
            
            if (qariSelects.length === 0) {
                console.warn('No Qari select elements found');
                return;
            }
            
            qariSelects.forEach(select => {
                // Clear existing options
                select.innerHTML = '';
                
                // Add options for each Qari
                this.qaris.forEach(qari => {
                    const option = document.createElement('option');
                    option.value = qari.id;
                    option.textContent = qari.name;
                    select.appendChild(option);
                });
                
                // Set default selection
                const defaultQari = localStorage.getItem('selectedQari') || 'adhan1';
                select.value = defaultQari;
                
                // Add change event listener
                select.addEventListener('change', () => {
                    const selectedQari = select.value;
                    localStorage.setItem('selectedQari', selectedQari);
                    console.log('Qari selection changed to:', selectedQari);
                });
            });
            
            console.log('Qari selects populated successfully');
        } catch (error) {
            console.error('Error populating Qari selects:', error);
        }
    }
    
    /**
     * Play Adhan for a specific prayer
     * @param {string} prayer - Prayer name
     * @param {string} qariId - Qari ID
     */
    playAdhan(prayer, qariId) {
        try {
            console.log(`Attempting to play ${prayer} Adhan with Qari ID: ${qariId}`);
            
            // Check if audio is initialized
            if (!this.audioInitialized || !this.audio) {
                console.warn('Audio not initialized, reinitializing...');
                this.initialize();
                
                if (!this.audioInitialized) {
                    console.error('Failed to initialize audio');
                    alert('Failed to initialize audio player. Please refresh the page.');
                    return;
                }
            }
            
            // Stop any currently playing Adhan
            this.stopAdhan();
            
            // Use stored Qari if none provided
            if (!qariId) {
                qariId = localStorage.getItem('selectedQari') || 'adhan1';
                console.log('Using stored Qari ID:', qariId);
            }
            
            // Find the selected Qari
            const qari = this.qaris.find(q => q.id === qariId);
            
            if (!qari) {
                console.error('Qari not found:', qariId);
                // Try fallback Qari
                const fallbackQari = this.qaris.find(q => q.id === 'fallback') || this.qaris[0];
                console.log('Using fallback Qari:', fallbackQari.id);
                
                if (!fallbackQari) {
                    alert('No Qari available for playback');
                    return;
                }
                
                qariId = fallbackQari.id;
            }
            
            // Determine which audio file to use (Fajr has a special Adhan)
            const audioPath = (prayer === 'fajr' || prayer === 'suhoor') 
                ? qari.fajrPath 
                : qari.path;
            
            console.log('Playing Adhan from path:', audioPath);
            
            // Preload audio
            this.audio.preload = 'auto';
            
            // Set audio source
            this.audio.src = audioPath;
            
            // Store current prayer and Qari
            this.currentPrayer = prayer;
            this.currentQari = qariId;
            
            // Update button states
            this.updateButtonStates(prayer, true);
            
            // Resume AudioContext if suspended (needed for iOS)
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume().catch(error => {
                    console.error('Error resuming AudioContext:', error);
                });
            }
            
            // Play the Adhan
            const playPromise = this.audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Adhan playback started successfully');
                    })
                    .catch(error => {
                        console.error('Error playing Adhan:', error);
                        this.onAdhanError(error);
                    });
            }
                
            console.log(`Playing ${prayer} Adhan with Qari: ${qari.name}`);
        } catch (error) {
            console.error('Error in playAdhan:', error);
            this.tryFallbackAudio();
        }
    }
    
    /**
     * Stop the currently playing Adhan
     */
    stopAdhan() {
        try {
            if (this.audio && !this.audio.paused) {
                console.log('Stopping current Adhan playback');
                this.audio.pause();
                this.audio.currentTime = 0;
                
                // Reset buttons
                this.resetButtons();
            }
        } catch (error) {
            console.error('Error stopping Adhan:', error);
        }
    }
    
    /**
     * Handle Adhan ended event
     */
    onAdhanEnded() {
        console.log('Adhan playback completed');
        this.resetButtons();
    }
    
    /**
     * Handle Adhan error event
     * @param {Event} error - Error event
     */
    onAdhanError(error) {
        console.error('Adhan playback error:', error);
        console.log('Error code:', this.audio.error ? this.audio.error.code : 'unknown');
        console.log('Current audio src:', this.audio.src);
        
        // Try fallback audio if available
        this.tryFallbackAudio();
        
        // Reset buttons
        this.resetButtons();
    }
    
    /**
     * Try to play fallback audio
     */
    tryFallbackAudio() {
        if (!this.currentPrayer) {
            console.warn('No current prayer set, cannot try fallback');
            return;
        }
        
        console.log('Trying fallback audio for prayer:', this.currentPrayer);
        
        // Try local fallback
        const fallbackPath = (this.currentPrayer === 'fajr' || this.currentPrayer === 'suhoor') 
            ? './assets/adhans/Local/default-azanfajr.mp3' 
            : './assets/adhans/Local/default-azan.mp3';
            
        console.log('Trying fallback audio:', fallbackPath);
        
        // Create a new audio element for fallback
        const fallbackAudio = new Audio();
        fallbackAudio.src = fallbackPath;
        fallbackAudio.preload = 'auto';
        
        // Add event listeners
        fallbackAudio.addEventListener('canplaythrough', () => {
            console.log('Fallback audio can play through');
        });
        
        fallbackAudio.addEventListener('error', (e) => {
            console.error('Fallback audio error:', e);
            console.log('Fallback error code:', fallbackAudio.error ? fallbackAudio.error.code : 'unknown');
            
            // Try CDN fallback as a last resort
            this.tryCDNFallback();
        });
        
        // Try to play
        fallbackAudio.play()
            .then(() => {
                console.log('Fallback audio playing successfully');
                // Replace the main audio with fallback
                this.audio = fallbackAudio;
            })
            .catch(error => {
                console.error('Fallback audio play failed:', error);
                
                // Try CDN fallback as a last resort
                this.tryCDNFallback();
            });
    }
    
    /**
     * Try to play CDN fallback audio
     */
    tryCDNFallback() {
        console.log('Trying CDN fallback audio');
        
        // Try multiple CDN sources
        const cdnPaths = [
            'https://cdn.islamic.network/adhans/128/al-afasy.mp3',
            'https://www.islamcan.com/audio/adhan/azan1.mp3',
            'https://www.islamcan.com/audio/adhan/azan2.mp3'
        ];
        
        // Try each CDN path in sequence
        this.tryNextCDN(cdnPaths, 0);
    }
    
    /**
     * Try next CDN in the list
     * @param {Array} cdnPaths - List of CDN paths
     * @param {number} index - Current index
     */
    tryNextCDN(cdnPaths, index) {
        if (index >= cdnPaths.length) {
            console.error('All CDN fallbacks failed');
            alert('Unable to play Adhan. Please check your audio settings and internet connection.');
            return;
        }
        
        const cdnPath = cdnPaths[index];
        console.log('Trying CDN fallback audio:', cdnPath);
        
        // Create a new audio element for CDN fallback
        const cdnAudio = new Audio();
        cdnAudio.src = cdnPath;
        cdnAudio.preload = 'auto';
        
        // Add event listeners
        cdnAudio.addEventListener('canplaythrough', () => {
            console.log('CDN audio can play through');
        });
        
        cdnAudio.addEventListener('error', () => {
            console.error('CDN audio error for path:', cdnPath);
            // Try next CDN
            this.tryNextCDN(cdnPaths, index + 1);
        });
        
        // Try to play
        cdnAudio.play()
            .then(() => {
                console.log('CDN audio playing successfully');
                // Replace the main audio with CDN audio
                this.audio = cdnAudio;
            })
            .catch(error => {
                console.error('CDN audio play failed:', error);
                // Try next CDN
                this.tryNextCDN(cdnPaths, index + 1);
            });
    }
    
    /**
     * Update button states for a specific prayer
     * @param {string} prayer - Prayer name
     * @param {boolean} isPlaying - Whether the Adhan is playing
     */
    updateButtonStates(prayer, isPlaying) {
        const playButton = document.querySelector(`.play-adhan[data-prayer="${prayer}"]`);
        const stopButton = document.querySelector(`.stop-adhan[data-prayer="${prayer}"]`);
        
        if (playButton && stopButton) {
            playButton.disabled = isPlaying;
            stopButton.disabled = !isPlaying;
        }
    }
    
    /**
     * Reset all play/stop buttons
     */
    resetButtons() {
        const playButtons = document.querySelectorAll('.play-adhan');
        const stopButtons = document.querySelectorAll('.stop-adhan');
        
        playButtons.forEach(btn => btn.disabled = false);
        stopButtons.forEach(btn => btn.disabled = true);
    }
    
    /**
     * Schedule Adhan for a prayer time
     * @param {string} prayer - Prayer name
     * @param {Date} time - Prayer time
     */
    scheduleAdhan(prayer, time) {
        const now = new Date();
        const timeUntilAdhan = time - now;
        
        // Only schedule if the prayer time is in the future
        if (timeUntilAdhan > 0) {
            console.log(`Scheduling ${prayer} Adhan for ${time.toLocaleTimeString()}`);
            
            setTimeout(() => {
                // Get the selected Qari for this prayer
                const qariSelect = document.getElementById(`${prayer}QariSelect`);
                const qariId = qariSelect ? qariSelect.value : 'adhan1';
                
                // Play the Adhan
                this.playAdhan(prayer, qariId);
                
                // Show notification if enabled
                this.showAdhanNotification(prayer);
            }, timeUntilAdhan);
        }
    }
    
    /**
     * Show notification for Adhan
     * @param {string} prayer - Prayer name
     */
    showAdhanNotification(prayer) {
        // Check if notifications are supported and permission is granted
        if ('Notification' in window && Notification.permission === 'granted') {
            const prayerNames = {
                tahajjud: 'Tahajjud',
                suhoor: 'Suhoor',
                fajr: 'Fajr',
                ishraq: 'Ishraq',
                dhuhr: 'Dhuhr',
                asr: 'Asr',
                maghrib: 'Maghrib',
                isha: 'Isha'
            };
            
            const notification = new Notification('Prayer Time', {
                body: `It's time for ${prayerNames[prayer]} prayer`,
                icon: './assets/icons/favicon.svg'
            });
            
            // Close notification after 10 seconds
            setTimeout(() => notification.close(), 10000);
        }
    }
} 