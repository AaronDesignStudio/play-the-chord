# Play The Chord

An interactive web-based piano training app designed to help users recognize and play chords by name. The app displays flashcard-style prompts with chord names, and users must press the correct keys on a digital piano interface.

## Features

- **Comprehensive Chord Library**: 73 different chord types across all 12 root notes
- **Interactive Piano**: 2.5 octaves (C4 to F6) with visual and audio feedback
- **Customizable Practice**: Select specific chord groups and root notes to practice
- **Smart Hint System**: Hints appear after 5 seconds of inactivity or 3 mistakes
- **Immediate Feedback**: Visual (green/red keys) and audio feedback for correct/incorrect notes
- **Progressive Learning**: First note glows to guide users, then they complete the chord
- **Dark Theme UI**: Professional, music education-focused interface

## Chord Categories

1. **Triads** - Major, Minor, Diminished, Augmented, Flat Fifth, Fifth
2. **Seventh Chords** - Dominant 7th, Major 7th, Minor 7th, and 12 more variations
3. **Sixth Chords** - Major 6th, Minor 6th, 6/9, Italian/German/French 6th
4. **Suspended Chords** - sus2, sus4, and their seventh variations
5. **Added Tone Chords** - add2, add4, add9, add11, add13 variations
6. **Ninth Chords** - 12 different ninth chord types
7. **Eleventh Chords** - 10 different eleventh chord types
8. **Thirteenth Chords** - 10 different thirteenth chord types

## How to Use

1. Open `index.html` in a modern web browser
2. Click "Select Chords" to choose:
   - Root notes (C, C#, D, etc.)
   - Chord groups and specific types
3. Click "Start Practice" to begin
4. Click the glowing first note to start each exercise
5. Complete the chord by clicking the remaining notes
6. The app automatically advances to the next chord

## Technology Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with CSS variables and animations
- **Vanilla JavaScript** - No framework dependencies
- **Web Audio API** - For piano sound synthesis

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required

## Credits

Developed by Aaron Amir

Design inspired by [piano-inversions-trainer](https://github.com/AaronDesignStudio/piano-inversions-trainer)