// Utilities
import { defineStore } from 'pinia'

import bubbleSound from '@/assets/sounds/bubbles.mp3';
import claySound from '@/assets/sounds/clay.mp3';
import confettiSound from '@/assets/sounds/confetti.mp3';
import coronaSound from '@/assets/sounds/corona.mp3';
import dottedSpiralSound from '@/assets/sounds/dotted-spiral.mp3';
import flash1Sound from '@/assets/sounds/flash-1.mp3';
import flash2Sound from '@/assets/sounds/flash-2.mp3';
import flash3Sound from '@/assets/sounds/flash-3.mp3';
import glimmerSound from '@/assets/sounds/glimmer.mp3';
import moonSound from '@/assets/sounds/moon.mp3';
import pinwheelSound from '@/assets/sounds/pinwheel.mp3';
import piston1Sound from '@/assets/sounds/piston-1.mp3';
import piston2Sound from '@/assets/sounds/piston-2.mp3';
import piston3Sound from '@/assets/sounds/piston-3.mp3';
import prism1Sound from '@/assets/sounds/prism-1.mp3';
import prism2Sound from '@/assets/sounds/prism-2.mp3';
import prism3Sound from '@/assets/sounds/prism-3.mp3';
import splitsSound from '@/assets/sounds/splits.mp3';
import squiggleSound from '@/assets/sounds/squiggle.mp3';
import strikeSound from '@/assets/sounds/strike.mp3';
import suspensionSound from '@/assets/sounds/suspension.mp3';
import timerSound from '@/assets/sounds/timer.mp3';
import ufoSound from '@/assets/sounds/ufo.mp3';
import veilSound from '@/assets/sounds/veil.mp3';
import wipeSound from '@/assets/sounds/wipe.mp3';
import zigZagSound from '@/assets/sounds/zig-zag.mp3';

export const useAppStore = defineStore('app', {
  state: () => ({
    sounds: [] as string[]
  }),
  actions: {
    loadSounds() {
      this.sounds = [
        bubbleSound,
        claySound,
        confettiSound,
        coronaSound,
        dottedSpiralSound,
        flash1Sound,
        flash2Sound,
        flash3Sound,
        glimmerSound,
        moonSound,
        pinwheelSound,
        piston1Sound,
        piston2Sound,
        piston3Sound,
        prism1Sound,
        prism2Sound,
        prism3Sound,
        splitsSound,
        squiggleSound,
        strikeSound,
        suspensionSound,
        timerSound,
        ufoSound,
        veilSound,
        wipeSound,
        zigZagSound
      ]

      // this.sounds = ['@/assets/sounds/bubbles.mp3', '../assets/sounds/clay.mp3',
      //   'assets/sounds/confetti.mp3', 'assets/sounds/corona.mp3', 'assets/sounds/dotted-spiral.mp3',
      //   'assets/sounds/flash-1.mp3', 'assets/sounds/flash-2.mp3', 'assets/sounds/flash-3.mp3',
      //   'assets/sounds/glimmer.mp3', 'assets/sounds/moon.mp3', 'assets/sounds/pinwheel.mp3',
      //   'assets/sounds/piston-1.mp3', 'assets/sounds/piston-2.mp3', 'assets/sounds/piston-3.mp3',
      //   'assets/sounds/prism-1.mp3', 'assets/sounds/prism-2.mp3', 'assets/sounds/prism-3.mp3',
      //   'assets/sounds/splits.mp3', 'assets/sounds/squiggle.mp3', 'assets/sounds/strike.mp3',
      //   'assets/sounds/suspension.mp3', 'assets/sounds/timer.mp3', 'assets/sounds/ufo.mp3',
      //   'assets/sounds/veil.mp3', 'assets/sounds/wipe.mp3', 'assets/sounds/zig-zag.mp3'
      // ];
    }
  },
  getters: {
    getSounds: (state) => state.sounds
  }
})
