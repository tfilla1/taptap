// Utilities
import { defineStore } from 'pinia'
// import { pino } from '@/data/soundboards/pino'
import { taptap, pino, determineScale } from '@/data/soundboards/taptap'
import { determineMidiInputs, determineMidiOutputs } from '@/utils/determineMidiDevices'
import { Degree } from '@/data/soundboards/taptap'

import { Pino } from '@/classes/Pino'
export const useAppStore = defineStore('app', {
  state: () => ({
    debug: false,
    midiDevices: [] as any[],
    midiOutputs: [] as any[],
    octave: 2,
    selectedMidiDevice: '',
    sounds: [] as Pino[],
    soundboards: [{ key: 'piano', icon: '$piano' }, { key: 'taptap', icon: '$drumpad' }],
    selectedSoundboard: { key: 'piano', icon: '$piano' },
    scale: {} as Degree[],
    root: 'C',
  }),
  actions: {
    loadMidiDevices(midiAccess: MIDIAccess) {
      this.midiDevices = determineMidiInputs(midiAccess);
      this.midiOutputs = determineMidiOutputs(midiAccess);
      return this.midiDevices
    },
    loadPianoSounds() {
      this.sounds = pino(this.root, this.octave)
      console.log(this.sounds)
      return this.sounds
    },
    loadTapTapSounds() {
      this.sounds = taptap()
      this.setOctave(1)
      console.log({ taptap: this.sounds })
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
    getMidiOutputs: (state) => state.midiOutputs,
    getOctave: (state) => state.octave,
    getSelectedMidiDevice: (state) => state.selectedMidiDevice,
    getScale: (state) => state.scale,
    getSounds: (state) => state.sounds,
    getSoundboards: (state) => state.soundboards,
    getSelectedSoundboard: (state) => state.selectedSoundboard
  }
})
