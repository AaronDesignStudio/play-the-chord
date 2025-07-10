// Chord definitions with intervals
const CHORD_DEFINITIONS = {
    // Triads
    'Major': [0, 4, 7],
    'Minor': [0, 3, 7],
    'Diminished': [0, 3, 6],
    'Augmented': [0, 4, 8],
    'Flat Fifth': [0, 4, 6],
    'Fifth': [0, 7],
    
    // Seventh Chords
    'Dominant Seventh': [0, 4, 7, 10],
    'Major Seventh': [0, 4, 7, 11],
    'Minor Seventh': [0, 3, 7, 10],
    'Diminished Seventh': [0, 3, 6, 9],
    'Half-Diminished Seventh': [0, 3, 6, 10],
    'Minor-Major Seventh': [0, 3, 7, 11],
    'Diminished Major Seventh': [0, 3, 6, 11],
    'Augmented Seventh': [0, 4, 8, 10],
    'Augmented Major Seventh': [0, 4, 8, 11],
    'Dominant Seventh Flat Fifth': [0, 4, 6, 10],
    'Dominant Seventh Sharp Fifth': [0, 4, 8, 10],
    'Minor-Major Seventh Flat Fifth': [0, 3, 6, 11],
    'Minor-Major Seventh Sharp Fifth': [0, 3, 8, 11],
    'Major Seventh Flat Fifth': [0, 4, 6, 11],
    'Major Seventh Sharp Fifth': [0, 4, 8, 11],
    
    // Sixth Chords
    'Major Sixth': [0, 4, 7, 9],
    'Minor Sixth': [0, 3, 7, 9],
    'Six/Nine': [0, 4, 7, 9, 14],
    'Minor Six/Nine': [0, 3, 7, 9, 14],
    'Italian Sixth': [0, 4, 10],
    'German Sixth': [0, 4, 7, 10],
    'French Sixth': [0, 4, 6, 10],
    
    // Suspended Chords
    'Suspended Second': [0, 2, 7],
    'Suspended Fourth': [0, 5, 7],
    'Seventh Suspended Second': [0, 2, 7, 10],
    'Seventh Suspended Fourth': [0, 5, 7, 10],
    'Major Seventh Suspended Second': [0, 2, 7, 11],
    'Major Seventh Suspended Fourth': [0, 5, 7, 11],
    'Sixth Suspended Second': [0, 2, 7, 9],
    
    // Added Tone Chords
    'Added Second': [0, 2, 4, 7],
    'Minor Added Second': [0, 2, 3, 7],
    'Added Fourth': [0, 4, 5, 7],
    'Minor Added Fourth': [0, 3, 5, 7],
    'Added Ninth': [0, 4, 7, 14],
    'Minor Added Ninth': [0, 3, 7, 14],
    'Added Eleventh': [0, 4, 7, 17],
    'Minor Added Eleventh': [0, 3, 7, 17],
    'Added Thirteenth': [0, 4, 7, 21],
    'Minor Added Thirteenth': [0, 3, 7, 21],
    'Added Sharp Eleventh': [0, 4, 7, 18],
    
    // Ninth Chords
    'Dominant Ninth': [0, 4, 7, 10, 14],
    'Minor Ninth': [0, 3, 7, 10, 14],
    'Major Ninth': [0, 4, 7, 11, 14],
    'Minor Major Ninth': [0, 3, 7, 11, 14],
    'Dominant Seventh Sharp Ninth': [0, 4, 7, 10, 15],
    'Dominant Major Ninth': [0, 4, 7, 11, 14],
    'Augmented Major Ninth': [0, 4, 8, 11, 14],
    'Augmented Dominant Ninth': [0, 4, 8, 10, 14],
    'Half Diminished Ninth': [0, 3, 6, 10, 14],
    'Half Diminished Minor Ninth': [0, 3, 6, 10, 13],
    'Diminished Ninth': [0, 3, 6, 9, 14],
    'Diminished Minor Ninth': [0, 3, 6, 9, 13],
    
    // Eleventh Chords
    'Eleventh': [0, 4, 7, 10, 14, 17],
    'Dominant Ninth Flat Eleventh': [0, 4, 7, 10, 14, 16],
    'Dominant Ninth Sharp Eleventh': [0, 4, 7, 10, 14, 18],
    'Minor Eleventh': [0, 3, 7, 10, 14, 17],
    'Major Eleventh': [0, 4, 7, 11, 14, 17],
    'Minor Major Eleventh': [0, 3, 7, 11, 14, 17],
    'Augmented Major Eleventh': [0, 4, 8, 11, 14, 17],
    'Augmented Eleventh': [0, 4, 8, 10, 14, 17],
    'Half Diminished Eleventh': [0, 3, 6, 10, 14, 17],
    'Diminished Eleventh': [0, 3, 6, 9, 14, 17],
    
    // Thirteenth Chords
    'Thirteenth': [0, 4, 7, 10, 14, 17, 21],
    'Minor Thirteenth': [0, 3, 7, 10, 14, 17, 21],
    'Major Thirteenth': [0, 4, 7, 11, 14, 17, 21],
    'Minor Major Thirteenth': [0, 3, 7, 11, 14, 17, 21],
    'Eleventh Flat Thirteenth': [0, 4, 7, 10, 14, 17, 20],
    'Eleventh Sharp Thirteenth': [0, 4, 7, 10, 14, 17, 22],
    'Augmented Major Thirteenth': [0, 4, 8, 11, 14, 17, 21],
    'Augmented Thirteenth': [0, 4, 8, 10, 14, 17, 21],
    'Half Diminished Thirteenth': [0, 3, 6, 10, 14, 17, 21],
    'Diminished Thirteenth': [0, 3, 6, 9, 14, 17, 21]
};

// Chord groups structure
const CHORD_GROUPS = {
    'Triads': ['Major', 'Minor', 'Diminished', 'Augmented', 'Flat Fifth', 'Fifth'],
    'Seventh Chords': [
        'Dominant Seventh', 'Major Seventh', 'Minor Seventh', 'Diminished Seventh',
        'Half-Diminished Seventh', 'Minor-Major Seventh', 'Diminished Major Seventh',
        'Augmented Seventh', 'Augmented Major Seventh', 'Dominant Seventh Flat Fifth',
        'Dominant Seventh Sharp Fifth', 'Minor-Major Seventh Flat Fifth',
        'Minor-Major Seventh Sharp Fifth', 'Major Seventh Flat Fifth', 'Major Seventh Sharp Fifth'
    ],
    'Sixth Chords': [
        'Major Sixth', 'Minor Sixth', 'Six/Nine', 'Minor Six/Nine',
        'Italian Sixth', 'German Sixth', 'French Sixth'
    ],
    'Suspended Chords': [
        'Suspended Second', 'Suspended Fourth', 'Seventh Suspended Second',
        'Seventh Suspended Fourth', 'Major Seventh Suspended Second',
        'Major Seventh Suspended Fourth', 'Sixth Suspended Second'
    ],
    'Added Tone Chords': [
        'Added Second', 'Minor Added Second', 'Added Fourth', 'Minor Added Fourth',
        'Added Ninth', 'Minor Added Ninth', 'Added Eleventh', 'Minor Added Eleventh',
        'Added Thirteenth', 'Minor Added Thirteenth', 'Added Sharp Eleventh'
    ],
    'Ninth Chords': [
        'Dominant Ninth', 'Minor Ninth', 'Major Ninth', 'Minor Major Ninth',
        'Dominant Seventh Sharp Ninth', 'Dominant Major Ninth', 'Augmented Major Ninth',
        'Augmented Dominant Ninth', 'Half Diminished Ninth', 'Half Diminished Minor Ninth',
        'Diminished Ninth', 'Diminished Minor Ninth'
    ],
    'Eleventh Chords': [
        'Eleventh', 'Dominant Ninth Flat Eleventh', 'Dominant Ninth Sharp Eleventh',
        'Minor Eleventh', 'Major Eleventh', 'Minor Major Eleventh',
        'Augmented Major Eleventh', 'Augmented Eleventh', 'Half Diminished Eleventh',
        'Diminished Eleventh'
    ],
    'Thirteenth Chords': [
        'Thirteenth', 'Minor Thirteenth', 'Major Thirteenth', 'Minor Major Thirteenth',
        'Eleventh Flat Thirteenth', 'Eleventh Sharp Thirteenth', 'Augmented Major Thirteenth',
        'Augmented Thirteenth', 'Half Diminished Thirteenth', 'Diminished Thirteenth'
    ]
};

// Note names
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const ENHARMONIC_EQUIVALENTS = {
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

// Generate all chords for all root notes
function generateAllChords() {
    const allChords = [];
    
    NOTES.forEach(root => {
        Object.entries(CHORD_GROUPS).forEach(([groupName, chordTypes]) => {
            chordTypes.forEach(chordType => {
                const intervals = CHORD_DEFINITIONS[chordType];
                const rootIndex = NOTES.indexOf(root);
                const notes = intervals.map(interval => {
                    const noteIndex = (rootIndex + interval) % 12;
                    return NOTES[noteIndex];
                });
                
                allChords.push({
                    name: `${root} ${chordType}`,
                    root: root,
                    notes: notes,
                    group: groupName,
                    subgroup: chordType,
                    intervals: intervals
                });
            });
        });
    });
    
    return allChords;
}

// Get chord display name (with proper formatting)
function getChordDisplayName(chord) {
    // Add special formatting for certain chord types
    const formatMap = {
        'Dominant Seventh': '7',
        'Major Seventh': 'maj7',
        'Minor Seventh': 'm7',
        'Minor': 'm',
        'Diminished': 'dim',
        'Augmented': 'aug',
        'Suspended Second': 'sus2',
        'Suspended Fourth': 'sus4',
        'Half-Diminished Seventh': 'ø7',
        'Added Ninth': 'add9',
        'Added Second': 'add2',
        'Added Fourth': 'add4',
        'Added Eleventh': 'add11',
        'Added Thirteenth': 'add13'
    };
    
    let displayName = chord.root;
    const formattedType = formatMap[chord.subgroup] || chord.subgroup;
    
    if (formattedType !== chord.subgroup || !formatMap[chord.subgroup]) {
        displayName += ' ' + formattedType;
    } else {
        displayName += formattedType;
    }
    
    return displayName;
}

// Export for use in other modules
window.ChordData = {
    CHORD_DEFINITIONS,
    CHORD_GROUPS,
    NOTES,
    ENHARMONIC_EQUIVALENTS,
    generateAllChords,
    getChordDisplayName
};