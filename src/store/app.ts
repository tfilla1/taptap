// Utilities
import { defineStore } from 'pinia'
// import { pino } from '@/data/soundboards/pino'
import { taptap, pino, determineScale } from '@/data/soundboards/taptap'
import { determineMidiInputs } from '@/utils/determineMidiDevices'
import { Degree } from '@/data/soundboards/taptap'

import { Pino } from '@/classes/Pino'
export const useAppStore = defineStore('app', {
  state: () => ({
    debug: false,
    midiDevices: [] as any[],
    midiOutputs: [] as any[],
    selectedMidiDevice: '',
    sounds: [] as Pino[],
    soundboards: [{ key: 'piano', icon: '$piano' }, { key: 'taptap', icon: '$drumpad' }],
    selectedSoundboard: { key: 'piano', icon: '$piano' },
    scale: {} as Degree[],
    root: 'C',
    octave: 2
  }),
  actions: {
    loadMidiDevices(midiAccess: MIDIAccess) {
      this.midiDevices = determineMidiInputs(midiAccess);
      return this.midiDevices
      // this.midiOutputs = determineMidiOutputs(midiAccess);
    },
    loadPianoSounds() {
      this.sounds = pino(this.root, this.octave)
      console.log(this.sounds)
      return this.sounds
    },
    loadTapTapSounds() {
      this.sounds = taptap
      console.log({ taptap })
      return this.sounds
    },
    loadScale() {
      this.scale = determineScale(this.root, this.octave)
      console.log({ scale: this.scale })
      return this.scale
    },
    loadSounds() {
      return this.selectedSoundboard.key === 'piano' ? this.loadPianoSounds() : this.loadTapTapSounds()
    },
    setOctave(octave: number) {
      this.octave = octave
    },
    setRoot(root: string) {
      this.root = root
    },
    setSelectedMidiDevice(id: string) {
      console.log({ id });
      this.selectedMidiDevice = id;
      return this.selectedMidiDevice;
    },
    setSelectedSoundboard() {
      this.selectedSoundboard = this.selectedSoundboard.key === 'piano' ? this.soundboards.find(sb => sb.key === 'taptap')! : this.soundboards.find(sb => sb.key === 'piano')!
      this.loadSounds()
      return this.selectedSoundboard
    },
    toggleDebug() {
      this.debug = !this.debug
    }
  },
  getters: {
    getDebug: (state) => state.debug,
    getMidiDevices: (state) => state.midiDevices,
    getSelectedMidiDevice: (state) => state.selectedMidiDevice,
    getScale: (state) => state.scale,
    getSounds: (state) => state.sounds,
    getSoundboards: (state) => state.soundboards,
    getSelectedSoundboard: (state) => state.selectedSoundboard
  }
})
