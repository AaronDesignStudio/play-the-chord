// Main application
class App {
    constructor() {
        this.piano = new Piano('piano');
        this.game = new ChordGame(this.piano);
        this.allChords = window.ChordData.generateAllChords();
        this.selectedRootNotes = new Set();
        this.selectedChordTypes = new Map();
        
        this.initializeUI();
        this.bindEvents();
    }
    
    initializeUI() {
        this.createRootNoteSelectors();
        this.createChordGroupSelectors();
        this.updateStartButton();
    }
    
    createRootNoteSelectors() {
        const container = document.getElementById('rootNotes');
        container.innerHTML = '';
        
        window.ChordData.NOTES.forEach(note => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('checkbox-wrapper');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `root-${note}`;
            checkbox.value = note;
            
            const label = document.createElement('label');
            label.htmlFor = `root-${note}`;
            label.textContent = note;
            
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
            
            // Event listener
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    this.selectedRootNotes.add(note);
                } else {
                    this.selectedRootNotes.delete(note);
                }
                this.updateStartButton();
            });
        });
    }
    
    createChordGroupSelectors() {
        const container = document.getElementById('chordGroups');
        container.innerHTML = '';
        
        Object.entries(window.ChordData.CHORD_GROUPS).forEach(([groupName, chordTypes]) => {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('chord-group');
            
            // Group header
            const header = document.createElement('div');
            header.classList.add('chord-group-header');
            
            const groupCheckbox = document.createElement('input');
            groupCheckbox.type = 'checkbox';
            groupCheckbox.id = `group-${groupName}`;
            
            const groupLabel = document.createElement('label');
            groupLabel.htmlFor = `group-${groupName}`;
            groupLabel.textContent = groupName;
            
            header.appendChild(groupCheckbox);
            header.appendChild(groupLabel);
            groupDiv.appendChild(header);
            
            // Chord types
            const typesDiv = document.createElement('div');
            typesDiv.classList.add('chord-types');
            
            chordTypes.forEach(chordType => {
                const typeWrapper = document.createElement('div');
                typeWrapper.classList.add('checkbox-wrapper');
                
                const typeCheckbox = document.createElement('input');
                typeCheckbox.type = 'checkbox';
                typeCheckbox.id = `type-${groupName}-${chordType}`;
                typeCheckbox.value = chordType;
                typeCheckbox.dataset.group = groupName;
                
                const typeLabel = document.createElement('label');
                typeLabel.htmlFor = `type-${groupName}-${chordType}`;
                typeLabel.textContent = chordType;
                
                typeWrapper.appendChild(typeCheckbox);
                typeWrapper.appendChild(typeLabel);
                typesDiv.appendChild(typeWrapper);
                
                // Event listener for individual chord type
                typeCheckbox.addEventListener('change', () => {
                    this.updateChordSelection(groupName, chordType, typeCheckbox.checked);
                    this.updateGroupCheckbox(groupName);
                    this.updateStartButton();
                });
            });
            
            groupDiv.appendChild(typesDiv);
            container.appendChild(groupDiv);
            
            // Event listener for group checkbox
            groupCheckbox.addEventListener('change', () => {
                const checkboxes = typesDiv.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.checked = groupCheckbox.checked;
                    const chordType = cb.value;
                    this.updateChordSelection(groupName, chordType, cb.checked);
                });
                this.updateStartButton();
            });
        });
    }
    
    updateChordSelection(groupName, chordType, selected) {
        if (!this.selectedChordTypes.has(groupName)) {
            this.selectedChordTypes.set(groupName, new Set());
        }
        
        const groupSet = this.selectedChordTypes.get(groupName);
        if (selected) {
            groupSet.add(chordType);
        } else {
            groupSet.delete(chordType);
        }
        
        if (groupSet.size === 0) {
            this.selectedChordTypes.delete(groupName);
        }
    }
    
    updateGroupCheckbox(groupName) {
        const groupCheckbox = document.getElementById(`group-${groupName}`);
        const groupChordTypes = window.ChordData.CHORD_GROUPS[groupName];
        const selectedTypes = this.selectedChordTypes.get(groupName) || new Set();
        
        if (selectedTypes.size === 0) {
            groupCheckbox.checked = false;
            groupCheckbox.indeterminate = false;
        } else if (selectedTypes.size === groupChordTypes.length) {
            groupCheckbox.checked = true;
            groupCheckbox.indeterminate = false;
        } else {
            groupCheckbox.checked = false;
            groupCheckbox.indeterminate = true;
        }
    }
    
    updateStartButton() {
        const startButton = document.getElementById('startGame');
        const hasRootNotes = this.selectedRootNotes.size > 0;
        const hasChordTypes = this.selectedChordTypes.size > 0;
        
        startButton.disabled = !hasRootNotes || !hasChordTypes;
    }
    
    bindEvents() {
        // Settings modal
        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettings = document.getElementById('closeSettings');
        const startGame = document.getElementById('startGame');
        
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });
        
        closeSettings.addEventListener('click', () => {
            settingsModal.classList.remove('active');
        });
        
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
        
        startGame.addEventListener('click', () => {
            const selectedChords = this.getSelectedChords();
            if (selectedChords.length > 0) {
                settingsModal.classList.remove('active');
                this.game.startGame(selectedChords);
            }
        });
        
        // Piano key clicks
        this.piano.onKeyClick((note, octave) => {
            this.game.handleKeyClick(note, octave);
        });
        
        // Show settings on first load
        settingsModal.classList.add('active');
    }
    
    getSelectedChords() {
        const selectedChords = [];
        
        this.selectedRootNotes.forEach(root => {
            this.selectedChordTypes.forEach((chordTypes, groupName) => {
                chordTypes.forEach(chordType => {
                    const chord = this.allChords.find(c => 
                        c.root === root && 
                        c.group === groupName && 
                        c.subgroup === chordType
                    );
                    if (chord) {
                        selectedChords.push(chord);
                    }
                });
            });
        });
        
        return selectedChords;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});