// Utilities
import { defineStore } from 'pinia'
import { pino } from '@/data/soundboards/pino'
import { taptap } from '@/data/soundboards/taptap'


import { Pino } from '@/classes/Pino'
export const useAppStore = defineStore('app', {
  state: () => ({
    sounds: [] as Pino[],
    soundboards: [{key: 'piano', icon: '$piano'}, {key: 'taptap', icon: '$drumpad'}],
    selectedSoundboard: {key: 'piano', icon: '$piano'}
  }),
  actions: {
    loadPianoSounds() {
      this.sounds = pino
      return this.sounds
    },
    loadTapTapSounds() {
      this.sounds = taptap
      console.log({taptap})
      return this.sounds
    },
    loadSounds() {
      return this.selectedSoundboard.key === 'piano' ? this.loadPianoSounds() : this.loadTapTapSounds()
    },
    setSelectedSoundboard() {
      this.selectedSoundboard = this.selectedSoundboard.key === 'piano' ? this.soundboards.find(sb => sb.key === 'taptap')! : this.soundboards.find(sb => sb.key === 'piano')!
      this.loadSounds()
      return this.selectedSoundboard
    }
  },
  getters: {
    getSounds: (state) => state.sounds,
    getSoundboards: (state) => state.soundboards,
    getSelectedSoundboard: (state) => state.selectedSoundboard
  }
})
