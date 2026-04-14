import React from 'react';
import './Piano.css';

const notes = [
  { note: 'C', freq: 261.63, type: 'white' },
  { note: 'C#', freq: 277.18, type: 'black' },
  { note: 'D', freq: 293.66, type: 'white' },
  { note: 'D#', freq: 311.13, type: 'black' },
  { note: 'E', freq: 329.63, type: 'white' },
  { note: 'F', freq: 349.23, type: 'white' },
  { note: 'F#', freq: 369.99, type: 'black' },
  { note: 'G', freq: 392.00, type: 'white' },
  { note: 'G#', freq: 415.30, type: 'black' },
  { note: 'A', freq: 440.00, type: 'white' },
  { note: 'A#', freq: 466.16, type: 'black' },
  { note: 'B', freq: 493.88, type: 'white' }
];

const playTone = (freq) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = 'triangle'; // triangle sounds a bit more like a soft piano/organ than sine
  osc.frequency.value = freq;
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start();
  // simple envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05); // Attack
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5); // Decay
  
  osc.stop(ctx.currentTime + 1.5);
};

export default function Piano() {
  return (
    <div className="piano-container">
      <h2>Piano Interactivo</h2>
      <div className="piano">
        {notes.map((n, i) => (
          <div 
            key={i} 
            className={`key ${n.type}`} 
            onMouseDown={() => playTone(n.freq)}
            onTouchStart={(e) => {
              e.preventDefault(); // prevent scrolling
              playTone(n.freq);
            }}
          >
            {n.type === 'white' && <span className="note-label">{n.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
