
import { Howl, Howler } from "howler";
import { Pino, Pitch } from "@/classes/Pino";
import { the_keys } from "@/utils/keyboard";
import { getRandomColor } from "@/utils/getRandomColor";
import { pianoData } from '../soundboards/pino'

const getColor = (degree: number, accidental: boolean) => {
  return accidental ? [degrees[degree], degrees[degree - 1]] : degrees[degree]
}

// key to number % 60 finds the letter to search for
export const notes = ['C', 'CS_DB', 'D', 'DS_EB', 'E', 'F', 'FS_GB', 'G', 'GS_AB', 'A', 'AS_BB', 'B']
export const degrees = ['#EB3F33', '#F28500', '#FFEE00', '#16A22D', '#0000E0', '#7C43B1', '#F976A6']
const major_scale = [2, 2, 1, 2, 2, 2, 1]
// [C - D - E - F - G - A - B - C ]
// [D-1, E-1, F♯-1, G-1, A-1, B-1, C♯-1, D-2]
const octaves = [0, 1, 2, 3, 4, 5, 6, 7]

export class Degree {
  note: string
  octave: number
  color: string | string[]

  constructor(note: string, octave: number, color: string) {
    this.note = note;
    this.octave = octave;
    this.color = color;
  }
}

export const determineScale = (root: string, octave: number): Degree[] => {
  // return [ {note: 'C', color: '#EB3F33'}]
  let position = notes.findIndex(note => note === root)
  const newScale: Degree[] = [{ note: notes[position], octave, color: getColor(0, false) }]
  major_scale.map((interval, index) => {
    position += interval

    if (position % notes.length === 0) {
      octave++
    }
    position = position % notes.length;


    newScale.push({ note: notes[position], octave, color: getColor(index + 1, false) })

    return {
      note: notes[position],
      color: degrees[position]
    }
  })

  return newScale
}

export const pino = (root: string, octave: number): Pino[] => {
  const type = 'piano'
  const scale = determineScale(root, octave)
  // const something = scale.map(sc => {
  //   return {

  //   }
  // })
  // console.log({ something })
  return notes.map((note, index) => {
    const noteObject = pianoData.find(p => p.note === note)
    return {
      note: note.split('_').length > 1 ? note.split('_') : note,
      key: noteObject?.key,
      pitches: Array.from(octaves, (octave) => {
        const source = `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${octave} ${note} ${octave}.mp3`

        return {
          octave,
          source,
          sound: new Howl({ src: [source] })
        } as Pitch
      }),
      color: scale.find(sc => sc.note === note) ? [scale.find(sc => sc.note === note)?.color] : getColor(index, true),
      border: scale.find(sc => sc.note === note)?.color,
      enharmonics: note.split('_').length > 1
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
