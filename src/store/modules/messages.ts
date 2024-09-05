import { defineStore } from 'pinia'

type Level = 'success' | 'error' | 'warning'

export const useMessageStore = defineStore('message', {
  state: () => ({
    queue: [],
    nextId: 0,
    offset: { x: 0, y: 0 },
    toast: {
      message: '',
      level: 'success',
      visible: false,
      resolve: () => { },
      reject: () => { }
    }
  }),
  getters: {
    getToast: (state) => state.toast
  },
  actions: {
    showToast(message: string, level: Level) {
      return new Promise<void>((resolve, reject) => {
        this.toast = {
          message,
          level,
          visible: true,
          resolve,
          reject
        }
      })
    },
    closeToast() {
      this.toast.resolve()
      this.toast = {
        message: '',
        level: 'success',
        visible: false,
        resolve: () => { },
        reject: () => { }
      }
    },
  }
})
