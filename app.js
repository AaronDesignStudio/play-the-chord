// Main application
class App {
    constructor() {
        this.piano = new Piano('piano');
        this.game = new ChordGame(this.piano);
        this.allChords = window.ChordData.generateAllChords();
        
        // Selection state
        this.selectedRootNotes = new Set();
        this.selectedChordTypes = new Set();
        
        this.initializeUI();
        this.bindEvents();
    }
    
    initializeUI() {
        this.createRootNoteDropdown();
        this.createChordTypeDropdown();
        this.updateStartButton();
    }
    
    createRootNoteDropdown() {
        const menu = document.getElementById('rootNoteMenu');
        
        window.ChordData.NOTES.forEach(note => {
            const label = document.createElement('label');
            label.classList.add('dropdown-checkbox');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = note;
            
            const span = document.createElement('span');
            span.textContent = note;
            
            label.appendChild(checkbox);
            label.appendChild(span);
            menu.appendChild(label);
        });
    }
    
    createChordTypeDropdown() {
        const menu = document.getElementById('chordTypeMenu');
        
        Object.entries(window.ChordData.CHORD_GROUPS).forEach(([groupName, chordTypes]) => {
            // Create group section
            const groupSection = document.createElement('div');
            groupSection.classList.add('chord-group-section');
            
            // Create group header with checkbox
            const groupHeader = document.createElement('div');
            groupHeader.classList.add('chord-group-header');
            
            const groupLabel = document.createElement('label');
            groupLabel.classList.add('dropdown-checkbox');
            
            const groupCheckbox = document.createElement('input');
            groupCheckbox.type = 'checkbox';
            groupCheckbox.value = groupName;
            groupCheckbox.dataset.groupName = groupName;
            
            const groupSpan = document.createElement('span');
            groupSpan.textContent = groupName;
            
            groupLabel.appendChild(groupCheckbox);
            groupLabel.appendChild(groupSpan);
            groupHeader.appendChild(groupLabel);
            groupSection.appendChild(groupHeader);
            
            // Create chord types grid
            const typesGrid = document.createElement('div');
            typesGrid.classList.add('chord-types-grid');
            
            chordTypes.forEach(chordType => {
                const typeLabel = document.createElement('label');
                typeLabel.classList.add('dropdown-checkbox');
                
                const typeCheckbox = document.createElement('input');
                typeCheckbox.type = 'checkbox';
                typeCheckbox.value = chordType;
                typeCheckbox.dataset.group = groupName;
                
                const typeSpan = document.createElement('span');
                typeSpan.textContent = chordType;
                
                typeLabel.appendChild(typeCheckbox);
                typeLabel.appendChild(typeSpan);
                typesGrid.appendChild(typeLabel);
            });
            
            groupSection.appendChild(typesGrid);
            menu.appendChild(groupSection);
        });
    }
    
    bindEvents() {
        // Setup dropdown toggles
        this.setupDropdownToggle('rootNoteDropdown');
        this.setupDropdownToggle('chordTypeDropdown');
        
        // Root notes selection
        const rootNoteMenu = document.getElementById('rootNoteMenu');
        const allNotesCheckbox = rootNoteMenu.querySelector('input[value="all"]');
        
        rootNoteMenu.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                if (e.target.value === 'all') {
                    // Handle "All Notes" checkbox
                    const noteCheckboxes = rootNoteMenu.querySelectorAll('input[type="checkbox"]:not([value="all"])');
                    noteCheckboxes.forEach(cb => {
                        cb.checked = e.target.checked;
                        if (e.target.checked) {
                            this.selectedRootNotes.add(cb.value);
                        } else {
                            this.selectedRootNotes.delete(cb.value);
                        }
                    });
                } else {
                    // Handle individual note checkbox
                    if (e.target.checked) {
                        this.selectedRootNotes.add(e.target.value);
                    } else {
                        this.selectedRootNotes.delete(e.target.value);
                    }
                    
                    // Update "All Notes" checkbox state
                    const noteCheckboxes = rootNoteMenu.querySelectorAll('input[type="checkbox"]:not([value="all"])');
                    const allChecked = Array.from(noteCheckboxes).every(cb => cb.checked);
                    const someChecked = Array.from(noteCheckboxes).some(cb => cb.checked);
                    
                    allNotesCheckbox.checked = allChecked;
                    allNotesCheckbox.indeterminate = !allChecked && someChecked;
                }
                
                this.updateRootNoteDisplay();
                this.updateStartButton();
            }
        });
        
        // Chord types selection
        const chordTypeMenu = document.getElementById('chordTypeMenu');
        
        chordTypeMenu.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const groupName = e.target.dataset.groupName;
                const chordType = e.target.value;
                
                if (groupName) {
                    // Group checkbox clicked
                    const groupCheckboxes = chordTypeMenu.querySelectorAll(`input[data-group="${groupName}"]`);
                    groupCheckboxes.forEach(cb => {
                        cb.checked = e.target.checked;
                        if (e.target.checked) {
                            this.selectedChordTypes.add(cb.value);
                        } else {
                            this.selectedChordTypes.delete(cb.value);
                        }
                    });
                } else {
                    // Individual chord type checkbox
                    if (e.target.checked) {
                        this.selectedChordTypes.add(chordType);
                    } else {
                        this.selectedChordTypes.delete(chordType);
                    }
                    
                    // Update group checkbox state
                    const group = e.target.dataset.group;
                    const groupCheckbox = chordTypeMenu.querySelector(`input[data-group-name="${group}"]`);
                    const groupCheckboxes = chordTypeMenu.querySelectorAll(`input[data-group="${group}"]`);
                    const allChecked = Array.from(groupCheckboxes).every(cb => cb.checked);
                    const someChecked = Array.from(groupCheckboxes).some(cb => cb.checked);
                    
                    groupCheckbox.checked = allChecked;
                    groupCheckbox.indeterminate = !allChecked && someChecked;
                }
                
                this.updateChordTypeDisplay();
                this.updateStartButton();
            }
        });
        
        // Start button
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            const selectedChords = this.getSelectedChords();
            if (selectedChords.length > 0) {
                this.game.startGame(selectedChords);
            }
        });
        
        // Piano key clicks
        this.piano.onKeyClick((note, octave) => {
            this.game.handleKeyClick(note, octave);
        });
        
        // Initialize with all selected
        allNotesCheckbox.click();
    }
    
    setupDropdownToggle(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const trigger = dropdown.querySelector('.dropdown-trigger');
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = dropdown.classList.contains('active');
            
            // Close all dropdowns
            document.querySelectorAll('.custom-dropdown').forEach(d => {
                d.classList.remove('active');
            });
            
            // Toggle this dropdown
            if (!wasActive) {
                dropdown.classList.add('active');
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdown.querySelector('.dropdown-menu').addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
    }
    
    updateRootNoteDisplay() {
        const valueEl = document.getElementById('rootNoteValue');
        if (this.selectedRootNotes.size === 0) {
            valueEl.textContent = 'None';
        } else if (this.selectedRootNotes.size === window.ChordData.NOTES.length) {
            valueEl.textContent = 'All';
        } else if (this.selectedRootNotes.size === 1) {
            valueEl.textContent = Array.from(this.selectedRootNotes)[0];
        } else {
            valueEl.textContent = `${this.selectedRootNotes.size} selected`;
        }
    }
    
    updateChordTypeDisplay() {
        const valueEl = document.getElementById('chordTypeValue');
        const totalChordTypes = Object.values(window.ChordData.CHORD_GROUPS)
            .reduce((sum, types) => sum + types.length, 0);
        
        if (this.selectedChordTypes.size === 0) {
            valueEl.textContent = 'None';
        } else if (this.selectedChordTypes.size === totalChordTypes) {
            valueEl.textContent = 'All';
        } else if (this.selectedChordTypes.size === 1) {
            valueEl.textContent = Array.from(this.selectedChordTypes)[0];
        } else {
            valueEl.textContent = `${this.selectedChordTypes.size} selected`;
        }
    }
    
    updateStartButton() {
        const startBtn = document.getElementById('startBtn');
        const hasSelection = this.selectedRootNotes.size > 0 && this.selectedChordTypes.size > 0;
        startBtn.disabled = !hasSelection;
    }
    
    getSelectedChords() {
        const selectedChords = [];
        
        this.selectedRootNotes.forEach(root => {
            this.selectedChordTypes.forEach(chordType => {
                const chord = this.allChords.find(c => 
                    c.root === root && c.subgroup === chordType
                );
                if (chord) {
                    selectedChords.push(chord);
                }
            });
        });
        
        return selectedChords;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});