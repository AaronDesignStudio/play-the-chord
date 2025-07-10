// Game logic
class ChordGame {
    constructor(piano) {
        this.piano = piano;
        this.currentChord = null;
        this.selectedChords = [];
        this.currentIndex = 0;
        this.mistakes = 0;
        this.hintsUsed = false;
        this.startTime = null;
        this.hintTimeout = null;
        this.exerciseStarted = false;
        this.correctNotes = new Set();
        this.currentOctave = 4;
        
        // UI elements
        this.chordNameEl = document.getElementById('chordName');
        this.feedbackEl = document.getElementById('feedback');
        this.flashcardEl = document.getElementById('flashcard');
    }
    
    // Start game with selected chords
    startGame(selectedChords) {
        this.selectedChords = this.shuffleArray([...selectedChords]);
        this.currentIndex = 0;
        this.nextChord();
    }
    
    // Move to next chord
    nextChord() {
        if (this.currentIndex >= this.selectedChords.length) {
            this.currentIndex = 0;
            this.selectedChords = this.shuffleArray(this.selectedChords);
        }
        
        this.currentChord = this.selectedChords[this.currentIndex];
        this.currentIndex++;
        
        this.resetExercise();
        this.displayChord();
    }
    
    // Reset exercise state
    resetExercise() {
        this.piano.reset();
        this.mistakes = 0;
        this.hintsUsed = false;
        this.exerciseStarted = false;
        this.correctNotes.clear();
        this.clearHintTimeout();
        this.feedbackEl.textContent = '';
        this.feedbackEl.className = 'feedback';
        this.piano.setEnabled(true);
    }
    
    // Display current chord
    displayChord() {
        const displayName = window.ChordData.getChordDisplayName(this.currentChord);
        this.chordNameEl.textContent = displayName;
        
        // Animate flashcard
        this.flashcardEl.style.animation = 'slideIn 0.5s ease';
        
        // Show glowing first note
        const firstNote = this.currentChord.notes[0];
        this.piano.glowKey(firstNote, this.currentOctave);
    }
    
    // Handle key click
    handleKeyClick(note, octave) {
        // Resume audio context on first interaction
        window.audioSystem.resume();
        
        // Play note sound
        window.audioSystem.playNote(note, octave);
        
        if (!this.exerciseStarted) {
            // Check if clicked key is the first note
            if (note === this.currentChord.notes[0]) {
                this.startExercise(octave);
            }
            return;
        }
        
        // Check if note is in chord
        const noteInChord = this.isNoteInChord(note, octave);
        
        if (noteInChord) {
            this.handleCorrectNote(note, octave);
        } else {
            this.handleIncorrectNote(note, octave);
        }
    }
    
    // Start the exercise
    startExercise(octave) {
        this.exerciseStarted = true;
        this.currentOctave = octave;
        this.startTime = Date.now();
        
        // Mark first note as correct
        const firstNote = this.currentChord.notes[0];
        this.piano.markCorrect(firstNote, octave);
        this.correctNotes.add(firstNote);
        
        // Remove glow
        this.piano.removeGlow();
        
        // Start hint timeout
        this.startHintTimeout();
    }
    
    // Check if note is in current chord
    isNoteInChord(note, octave) {
        // For now, we only check the note name, not the octave
        // This allows the chord to span multiple octaves
        return this.currentChord.notes.includes(note);
    }
    
    // Handle correct note
    handleCorrectNote(note, octave) {
        if (!this.correctNotes.has(note)) {
            this.piano.markCorrect(note, octave);
            this.correctNotes.add(note);
            
            // Reset hint timeout
            this.clearHintTimeout();
            this.startHintTimeout();
            
            // Check if chord is complete
            if (this.correctNotes.size === this.currentChord.notes.length) {
                this.completeExercise();
            }
        }
    }
    
    // Handle incorrect note
    handleIncorrectNote(note, octave) {
        this.piano.markIncorrect(note, octave);
        window.audioSystem.playError();
        this.mistakes++;
        
        // Show hint after 3 mistakes
        if (this.mistakes >= 3 && !this.hintsUsed) {
            this.showHint();
        }
    }
    
    // Complete the exercise
    completeExercise() {
        this.clearHintTimeout();
        this.piano.setEnabled(false);
        
        const perfect = this.mistakes === 0 && !this.hintsUsed;
        
        if (perfect) {
            this.feedbackEl.textContent = 'Perfect! 🎯';
            this.feedbackEl.classList.add('perfect');
            window.audioSystem.playPerfectSuccess();
        } else {
            this.feedbackEl.textContent = 'Good job! 👍';
            this.feedbackEl.classList.add('success');
            window.audioSystem.playSuccess();
        }
        
        // Play the complete chord
        setTimeout(() => {
            window.audioSystem.playChord(this.currentChord.notes, this.currentOctave);
        }, 500);
        
        // Move to next chord after delay
        setTimeout(() => {
            this.flashcardEl.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                this.nextChord();
            }, 500);
        }, 2000);
    }
    
    // Show hint
    showHint() {
        this.hintsUsed = true;
        
        // Find next required note
        const nextNote = this.currentChord.notes.find(note => !this.correctNotes.has(note));
        if (nextNote) {
            // Try to find the note in the current octave first
            let hintOctave = this.currentOctave;
            const noteIndex = window.ChordData.NOTES.indexOf(nextNote);
            const firstNoteIndex = window.ChordData.NOTES.indexOf(this.currentChord.notes[0]);
            
            // Adjust octave if needed
            if (noteIndex < firstNoteIndex) {
                hintOctave = this.currentOctave + 1;
            }
            
            this.piano.hintKey(nextNote, hintOctave);
        }
    }
    
    // Hint timeout management
    startHintTimeout() {
        this.hintTimeout = setTimeout(() => {
            if (!this.hintsUsed) {
                this.showHint();
            }
        }, 5000);
    }
    
    clearHintTimeout() {
        if (this.hintTimeout) {
            clearTimeout(this.hintTimeout);
            this.hintTimeout = null;
        }
    }
    
    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Export ChordGame class
window.ChordGame = ChordGame;