import { Pino, Pitch } from "@/classes/Pino";
import { the_keys } from "@/utils/keyboard";
import { getRandomColor } from "@/utils/getRandomColor";
import { convertMidiToNote } from "@/utils/convertMidiToNote";
import { pianoData } from '../soundboards/pino'

const getColor = (note: string) => {

}

// key to number % 60 finds the letter to search for
const notes = ['C', 'CS_DB', 'D', 'DS_EB', 'E', 'F', 'FS_GB', 'G', 'A', 'AS_BB', 'B',]

const major_scale = [2, 2, 1, 2, 2, 2, 1]
const octaves = [0, 1, 2, 3, 4, 5, 6, 7]

const keys = ['a', 's', 'd', 'f']

export const pino = (type: 'piano'): Pino[] => {
  return notes.map(note => {
    const noteObject = pianoData.find(p => p.note === note)
    return {
      note: noteObject?.enharmonics ? note.split('_') : note,
      key: noteObject?.key,
      pitches: Array.from(octaves, (octave) => {
        return {
          octave,
          source: `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${octave} ${note} ${octave}.mp3`
        } as Pitch
      }),
      color: noteObject?.color,
      border: noteObject?.color,
      enharmonics: noteObject?.enharmonics
    } as Pino
  })
}


const urls = ['bubbles.mp3', 'clay.mp3',
  'confetti.mp3', 'corona.mp3', 'dotted-spiral.mp3',
  'flash-1.mp3', 'flash-2.mp3', 'flash-3.mp3',
  'glimmer.mp3', 'moon.mp3', 'pinwheel.mp3',
  'piston-1.mp3', 'piston-2.mp3', 'piston-3.mp3',
  'prism-1.mp3', 'prism-2.mp3', 'prism-3.mp3',
  'splits.mp3', 'squiggle.mp3', 'strike.mp3',
  'suspension.mp3', 'timer.mp3', 'ufo.mp3',
  'veil.mp3', 'wipe.mp3', 'zig-zag.mp3'
];


export const taptap = Array.from(the_keys, (key) => {
  const hasBeenTaken = [] as number[]
  return {
    key: [key.letter],
    color: getRandomColor(),
    note: key.letter,
    enharmonics: key.enharmonics,
    pitches: [{
      source: fillPino(hasBeenTaken),
      octave: 1
    } as Pitch] as Pitch[]
  } as Pino
})

function fillPino(hasBeenTaken: number[]) {
  const randomItem = Math.floor(Math.random() * 26);
  if (hasBeenTaken.includes(randomItem) && hasBeenTaken.length < 26) {
    fillPino(hasBeenTaken)
  }
  hasBeenTaken.push(randomItem)
  return import.meta.env.VITE_SOUNDS_DIR + '/taptap/' + urls[randomItem]
}
