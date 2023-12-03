// Utilities
import { defineStore } from 'pinia'
// import { pino } from '@/data/soundboards/pino'
import { taptap, pino } from '@/data/soundboards/taptap'
import { determineMidiInputs, determineMidiOutputs } from '@/utils/determineMidiDevices'


import { Pino } from '@/classes/Pino'
export const useAppStore = defineStore('app', {
  state: () => ({
    midiDevices: [] as any[],
    midiOutputs: [] as any[],
    selectedMidiDevice: '',
    sounds: [] as Pino[],
    soundboards: [{ key: 'piano', icon: '$piano' }, { key: 'taptap', icon: '$drumpad' }],
    selectedSoundboard: { key: 'piano', icon: '$piano' }
  }),
  actions: {
    loadMidiDevices(midiAccess: MIDIAccess) {
      this.midiDevices = determineMidiInputs(midiAccess);
      this.midiOutputs = determineMidiOutputs(midiAccess);
      return this.midiDevices
    },
    loadPianoSounds() {
      this.sounds = pino('piano')
      console.log(this.sounds)
      return this.sounds
    },
    loadTapTapSounds() {
      this.sounds = taptap
      console.log({ taptap })
      return this.sounds
    },
    loadSounds() {
      return this.selectedSoundboard.key === 'piano' ? this.loadPianoSounds() : this.loadTapTapSounds()
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
    }
  },
  getters: {
    getMidiDevices: (state) => state.midiDevices,
    getMidiOutputs: (state) => state.midiOutputs,
    getSelectedMidiDevice: (state) => state.selectedMidiDevice,
    getSounds: (state) => state.sounds,
    getSoundboards: (state) => state.soundboards,
    getSelectedSoundboard: (state) => state.selectedSoundboard
  }
})
