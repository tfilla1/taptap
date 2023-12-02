import { useAppStore } from '@/store/app';

export const convertMidiToNote = (midiKey: number) => {
  const pino = useAppStore().getSounds
  const notes = pino.map((p) => p.note);
  const octave = Math.floor(midiKey / 12) - 1;
  const note = notes[midiKey % 12];

  return pino
    .find((p) => p.note == note)
    ?.pitches.filter((p) => p.octave === octave)
    ?.map((s) => ({
      source: s.source,
      sound: new Howl({ src: [s.source] }),
    }));
}
