import { pianoData } from '../data/soundboards/pino'

export const convertMidiToNote = (midiKey: number) => {
  const notes = pianoData.map((p) => p.note);
  const octave = Math.floor(midiKey / 12) - 1;
  const note = notes[midiKey % 12];

  const returnThis = pianoData.find(x => x.note === note && x.pitches.find(p => p.octave === octave))
  console.log({ octave, note })
  console.log(returnThis)
  return { octave, note }
}
