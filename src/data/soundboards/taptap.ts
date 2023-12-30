
import { Howl, Howler } from "howler";
import { Pino, Pitch } from "@/classes/Pino";
import { the_keys } from "@/utils/keyboard";
import { getRandomColor } from "@/utils/getRandomColor";
import { pianoData } from '../soundboards/pino'

const getColor = (degree: number, accidental: boolean) => {
  return accidental ? [degrees[degree], degrees[degree - 1]] : [degrees[degree]]
}

// key to number % 60 finds the letter to search for
const c_scale = {
  scale: 'C',
  degrees: [
    {
      degree: 0,
      note: 'C',
      color: '#EB3F33'
    },
    {
      degree: undefined,
      note: 'CS_DB',
      color: ['#EB3F33', '#F28500'],
      accidental: true
    },
    {
      degree: 1,
      note: 'D',
      color: '#F28500'
    }
  ]
}

const d_scale = {
  scale: 'D',
  degrees: [
    { "note": "D", "octave": 2, "color": ["#EB3F33"] },
    { "note": "E", "octave": 2, "color": ["#F28500"] },
    { "note": "FS_GB", "octave": 2, "color": ["#FFEE00"] },
    { "note": "G", "octave": 2, "color": ["#16A22D"] },
    { "note": "A", "octave": 2, "color": ["#0000E0"] },
    { "note": "B", "octave": 2, "color": ["#7C43B1"] },
    { "note": "CS_DB", "octave": 2, "color": ["#F976A6"] },
    { "note": "D", "octave": 3, "color": [null] }]
}
export const notes = ['C', 'CS_DB', 'D', 'DS_EB', 'E', 'F', 'FS_GB', 'G', 'GS_AB', 'A', 'AS_BB', 'B']
export const degrees = ['#EB3F33', '#F28500', '#FFEE00', '#16A22D', '#0000E0', '#7C43B1', '#F976A6']
const major_scale = [2, 2, 1, 2, 2, 2, 1]
// [C - D - E - F - G - A - B - C ]
// [D-1, E-1, F♯-1, G-1, A-1, B-1, C♯-1, D-2]
const octaves = [0, 1, 2, 3, 4, 5, 6, 7]

export class Degree {
  note: string
  octave: number
  color: string[]

  constructor(note: string, octave: number, color: string[]) {
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
  // return scale.map(sc => {
  //   console.log({ sc })
  //   return {
  //     note: sc.note,
  //     color: sc.color,
  //     enharmonics: sc.note.split('_').length > 1,
  //     octave: sc.octave,
  //     key: pianoData.find(p => p.note === sc.note)?.key,
  //     pitches: Array.from(octaves, (octave) => {
  //       const source = `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${sc.octave} ${sc.note} ${sc.octave}.mp3`

  //       return {
  //         octave,
  //         source,
  //         sound: new Howl({ src: [source] })
  //       } as Pitch
  //     }),
  //   } as Pino
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


export const taptap = () => {
  return Array.from(the_keys, (key) => {
    const hasBeenTaken = [] as number[]
    const source = fillPino(hasBeenTaken)

    return {
      key: [key.letter],
      color: getRandomColor(),
      note: key.letter,
      enharmonics: key.enharmonics,
      pitches: [{
        source,
        sound: new Howl({ src: [source] }),
        octave: 1
      } as Pitch] as Pitch[]
    } as Pino
  })
}

function fillPino(hasBeenTaken: number[]) {
  const randomItem = Math.floor(Math.random() * 26);
  if (hasBeenTaken.includes(randomItem) && hasBeenTaken.length < 26) {
    fillPino(hasBeenTaken)
  }
  hasBeenTaken.push(randomItem)
  return import.meta.env.VITE_SOUNDS_DIR + '/taptap/' + urls[randomItem]
}
