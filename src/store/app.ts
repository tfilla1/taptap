import { piano, taptap } from '@/data/soundboards/taptap'
import { determineMidiInputs, determineMidiOutputs } from '@/utils/determineMidiDevices'
import { defineStore } from 'pinia'

import { Pino, Soundboard, SoundboardType } from '@/classes/Pino'
const soundboards = [{ key: 'piano', icon: '$piano' }, { key: 'taptap', icon: '$pad' }] as Soundboard[]


interface Icon {
  key: string
  value: string
}
export const useAppStore = defineStore('app', {
  state: () => ({
    app: { key: 'pino', icon: '$logo' },
    icons: [] as Icon[],
    menu: false,
    midiDevices: [] as any[],
    midiOutputs: [] as any[],
    octave: 1,
    selectedMidiDevice: '',
    sounds: [] as Pino[],
    soundboards: [] as Soundboard[],
    selectedSoundboard: soundboards.find(s => s.key === 'piano') as Soundboard
  }),
  actions: {
    loadIcons() {
      this.icons = [
        {
          key: 'guitar',
          value: '$guitar'
        },
        {
          key: 'pad',
          value: '$pad'
        },
        {
          key: 'piano',
          value: 'piano'
        }
      ]
    },
    loadMidiDevices(midiAccess: MIDIAccess) {
      this.midiDevices = determineMidiInputs(midiAccess);
      this.midiOutputs = determineMidiOutputs(midiAccess);
      return this.midiDevices
    },
    addSoundboard(soundboard: Soundboard) {
      this.soundboards.push(soundboard)
    },
    loadSoundboards() {
      this.soundboards = soundboards
    },
    loadSoundsByType(type: SoundboardType) {
      switch (type) {
        case 'piano':
          this.sounds = piano()
          break;
        case 'taptap':
          this.loadTapTapSounds()
          break;
      }
      return this.sounds
    },
    loadPianoSounds() {
      this.sounds = piano()
      return this.sounds
    },
    loadTapTapSounds() {
      this.sounds = taptap()
      this.setOctave(1)
      console.log({ taptap: this.sounds })
      return this.sounds
    },
    loadSounds() {
      return this.selectedSoundboard.key === 'piano' ? this.loadPianoSounds() : this.loadTapTapSounds()
    },
    setOctave(value: number) {
      this.octave = value
      // this.loadSounds()
    },
    setSelectedMidiDevice(id: string) {
      console.log({ id });
      this.selectedMidiDevice = id;
      return this.selectedMidiDevice;
    },
    setSelectedSoundboard(key: string) {
      this.selectedSoundboard = this.soundboards.find(soundboard => soundboard.key === key) ?? {} as Soundboard
      this.loadSounds()
      return this.selectedSoundboard
    },
    toggleMenu() {
      this.menu = !this.menu
    }
  },
  getters: {
    getApp: (state) => state.app,
    getIcons: (state) => state.icons,
    getMenu: (state) => state.menu,
    getMidiDevices: (state) => state.midiDevices,
    getMidiOutputs: (state) => state.midiOutputs,
    getOctave: (state) => state.octave,
    getSelectedMidiDevice: (state) => state.selectedMidiDevice,
    getSounds: (state) => state.sounds,
    getSoundboards: (state) => state.soundboards,
    getSelectedSoundboard: (state) => state.selectedSoundboard
  }
})
