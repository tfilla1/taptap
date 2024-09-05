
import { Pino, Pitch, ScalePosition } from "@/classes/Pino";
import { getRandomColor } from "@/utils/getRandomColor";
import { piano_keys, tap_tap_keys_modified } from "@/utils/keyboard";
import { Howl } from "howler";
import { SCALE_COLORS } from '../../constants/colors';
import { pianoData } from '../soundboards/pino';


// key to number % 60 finds the letter to search for
export const notes = ['C', 'CS_DB', 'D', 'DS_EB', 'E', 'F', 'FS_GB', 'G', 'GS_AB', 'A', 'AS_BB', 'B']
export const natural_notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const accidental_notes = ['CS_DB', 'DS_EB', 'FS_GB', 'GS_AB', 'AS_BB']

const major_scale = [2, 2, 1, 2, 2, 2, 1]
// [C - D - E - F - G - A - B - C ]
// [D-1, E-1, F♯-1, G-1, A-1, B-1, C♯-1, D-2]
// const octaves = [0, 1, 2, 3, 4, 5, 6, 7]
const octaves = [0, 1, 2, 3, 4, 5, 6]

const colors = Array.from(Object.values(SCALE_COLORS))
const positions = Array.from(Object.keys(SCALE_COLORS))

const getAccidentalColor = (position: ScalePosition) => {
  return [colors[positions.findIndex(x => x === position) + 1 % colors.length], SCALE_COLORS[position]]
}
const getAccidentalColorAlt = (position: ScalePosition) => {
  const pos = positions.findIndex(x => x === position)

  return [blendColors(colors[pos + 1 % colors.length], SCALE_COLORS[position])]
}
const getNaturalColor = (position: ScalePosition) => {
  return SCALE_COLORS[position]
}

function blendColors(color1: string, color2: string): string {
  // Simple averaging of hex colors
  const hex = (x: string) => parseInt(x, 16);
  const r = Math.floor((hex(color1.substr(1, 2)) + hex(color2.substr(1, 2))) / 2);
  const g = Math.floor((hex(color1.substr(3, 2)) + hex(color2.substr(3, 2))) / 2);
  const b = Math.floor((hex(color1.substr(5, 2)) + hex(color2.substr(5, 2))) / 2);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function determineAnimationTarget(currentPino: Pino, currentIndex: number, currentOctave: number) {
  return `${currentPino.accidental
    ? currentPino.note.split("_")[currentIndex]
    : currentPino.note
    }${!currentPino.accidental
      ? "-" +
      currentPino.pitches?.find((x) => x.octave === currentOctave)?.octave
      : ""
    }`;
}

export const determineScale = (root: string, octave: number): string[] => {

  let position = notes.findIndex(note => note === root)
  const newScale: string[] = [notes[position] + '-' + octave]
  major_scale.map(interval => {
    position += interval

    if (position % notes.length === 0) {
      octave++
    }
    position = position % notes.length;

    newScale.push(notes[position] + '-' + octave)

    return notes[position]
  })

  return newScale
}

export const pino = (type: 'piano'): Pino[] => {
  return notes.map(note => {
    const noteObject = pianoData.find(p => p.note === note)
    return {
      note: note,
      key: noteObject?.key,
      pitches: Array.from(octaves, (octave) => {
        const source = `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${octave} ${note} ${octave}.mp3`

        return {
          octave,
          source,
          sound: new Howl({ src: [source] })
        } as Pitch
      }),
      color: noteObject?.color,
      border: noteObject?.color,
      enharmonics: noteObject?.enharmonics
    } as Pino
  })
}




function generatePino(type: string = 'piano') {
  const mappings = [];
  let octave = 0;
  let noteIndex = 0;
  let previousNoteIndex = -1;

  const root = 'C' // set scale here


  for (const note of notes) {
    const key = piano_keys[noteIndex % piano_keys.length];

    if (note === root && noteIndex > 0) octave++
    const accidental = note.includes('_') // this is only true for C scale


    const note_position = !accidental ? natural_notes.findIndex(x => x === note) : previousNoteIndex
    if (!accidental) previousNoteIndex = note_position

    const scale_position = positions[note_position] as ScalePosition

    const color = accidental ? getAccidentalColor(scale_position) : [getNaturalColor(scale_position)]
    const altColor = accidental ? getAccidentalColorAlt(scale_position) : [getNaturalColor(scale_position)]
    const source = `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${octave} ${note} ${octave}.mp3`
    const sound = new Howl({ src: [source] })


    const pitches = Array.from(octaves, (octave) => {
      const source = `${import.meta.env.VITE_SOUNDS_DIR}/${type}/_ ${octave} ${note} ${octave}.mp3`

      return {
        octave,
        source,
        sound: new Howl({ src: [source] })
      } as Pitch
    })

    mappings.push({
      note,
      color: color,
      altColor,
      key,
      accidental: accidental ?? false,
      position: scale_position,
      pitches,
      pitch: {
        octave,
        source,
        sound
      } as Pitch
    } as Pino);


    noteIndex++;

  }

  return mappings
}

export const piano = () => {
  const pinoMappings = generatePino()

  return pinoMappings.map((mapping) => {
    return {
      key: mapping.key,
      soundboard: 'piano',
      color: mapping.color,
      note: mapping.note,
      accidental: mapping.accidental,
      pitch: mapping.pitch,
      pitches: mapping.pitches,
      position: mapping.position,
      border: mapping.border
    } as Pino;
  });
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
  return Array.from(tap_tap_keys_modified, (key) => {
    const hasBeenTaken = [] as number[]
    const source = fillPino(hasBeenTaken)

    return {
      key: key.letter,
      soundboard: 'taptap',
      color: [getRandomColor()],
      note: key.letter,
      enharmonics: key.enharmonics,
      pitch: {
        source,
        sound: new Howl({ src: [source] }),
        octave: 1
      },
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
