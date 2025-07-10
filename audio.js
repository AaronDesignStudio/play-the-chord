// Audio system for playing piano notes
class AudioSystem {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = 0.3;
        
        // Piano sound parameters
        this.envelope = {
            attack: 0.01,
            decay: 0.3,
            sustain: 0.4,
            release: 0.5
        };
    }
    
    // Convert note name to frequency
    noteToFrequency(note, octave = 4) {
        const noteIndex = window.ChordData.NOTES.indexOf(note);
        const a4Frequency = 440;
        const a4Position = 57; // A4 is the 57th key on piano (starting from C0)
        const notePosition = octave * 12 + noteIndex;
        const halfStepsFromA4 = notePosition - a4Position;
        
        return a4Frequency * Math.pow(2, halfStepsFromA4 / 12);
    }
    
    // Play a single note
    playNote(note, octave = 4, duration = 0.5) {
        const frequency = this.noteToFrequency(note, octave);
        const now = this.audioContext.currentTime;
        
        // Create oscillators for richer sound
        const oscillators = [];
        const gains = [];
        
        // Fundamental frequency
        oscillators.push(this.createOscillator(frequency, 'sine'));
        gains.push(this.createGain(0.6));
        
        // First harmonic
        oscillators.push(this.createOscillator(frequency * 2, 'sine'));
        gains.push(this.createGain(0.3));
        
        // Second harmonic
        oscillators.push(this.createOscillator(frequency * 3, 'sine'));
        gains.push(this.createGain(0.1));
        
        // Connect oscillators
        oscillators.forEach((osc, i) => {
            osc.connect(gains[i]);
            gains[i].connect(this.masterGain);
        });
        
        // Apply envelope
        gains.forEach(gain => {
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(1, now + this.envelope.attack);
            gain.gain.exponentialRampToValueAtTime(
                this.envelope.sustain,
                now + this.envelope.attack + this.envelope.decay
            );
            gain.gain.exponentialRampToValueAtTime(
                0.01,
                now + duration + this.envelope.release
            );
        });
        
        // Start and stop oscillators
        oscillators.forEach(osc => {
            osc.start(now);
            osc.stop(now + duration + this.envelope.release);
        });
    }
    
    // Play a chord
    playChord(notes, octave = 4, duration = 1) {
        notes.forEach((note, index) => {
            // Slight delay between notes for strumming effect
            setTimeout(() => {
                this.playNote(note, octave, duration);
            }, index * 30);
        });
    }
    
    // Play success sound
    playSuccess() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.2);
    }
    
    // Play error sound
    playError() {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.2);
    }
    
    // Play perfect success sound
    playPerfectSuccess() {
        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                
                osc.start(now);
                osc.stop(now + 0.3);
            }, index * 100);
        });
    }
    
    // Helper methods
    createOscillator(frequency, type = 'sine') {
        const osc = this.audioContext.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        return osc;
    }
    
    createGain(value = 1) {
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(value, this.audioContext.currentTime);
        return gain;
    }
    
    // Resume audio context (needed for some browsers)
    resume() {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Export audio system
window.audioSystem = new AudioSystem();