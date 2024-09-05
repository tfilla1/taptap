import { useAppStore } from '@/store/app';
import { useMessageStore } from '@/store/modules/messages';

const messageStore = useMessageStore()

export const notes = ['C', 'CS_DB', 'D', 'DS_EB', 'E', 'F', 'FS_GB', 'G', 'GS_AB', 'A', 'AS_BB', 'B']
export const noteToNumber = (note: string, octave: number) => {
  return notes.indexOf(note) + octave * 12;
}

export const convertMidiToPino = (midiKey: number) => {
  const pino = useAppStore().getSounds
  const notes = pino.map((p) => p.note);
  const note = notes[midiKey % 12];

  return pino
    .find((p) => p.note == note)
}

export const convertMidiToPitch = (midiKey: number) => {
  const pino = useAppStore().getSounds
  const notes = pino.map((p) => p.note);
  const octave = Math.floor(midiKey / 12) - 1;
  const note = notes[midiKey % 12];


  messageStore.showToast(`${note}-${octave}`, 'success')

  return pino.find((p) => p.note == note)?.pitches?.find((p) => p.octave === octave)



}
