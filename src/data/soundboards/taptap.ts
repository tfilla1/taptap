import { Pino, Pitch } from "@/classes/Pino";
import { letters } from "@/utils/letters";
import { getRandomColor } from "@/utils/getRandomColor";


const urls = ['bubbles.mp3', 'clay.mp3',
  'confetti.mp3', 'corona.mp3', 'dotted-spiral.mp3',
  'flash-1.mp3', 'flash-2.mp3', 'flash-3.mp3',
  'glimmer.mp3', 'moon.mp3', 'pinwheel.mp3',
  'piston-1.mp3', 'piston-2.mp3', 'piston-3.mp3',
  'prism-1.mp3', 'prism-2.mp3', 'prism-3.mp3',
  'splits.mp3', 'squiggle.mp3', 'strike.mp3',
  'assets/sounds/suspension.mp3', 'timer.mp3', 'ufo.mp3',
  'veil.mp3', 'wipe.mp3', 'zig-zag.mp3'
];

export const taptap = Array.from(letters, (letter) => {
  const hasBeenTaken = [] as number[]
  return {
    key: [letter],
    color: getRandomColor(),
    note: 'C',
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
