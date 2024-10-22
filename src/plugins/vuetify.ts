/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import light from '../assets/colors/light.json'
import dark from '../assets/colors/dark.json'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiCircleOutline, mdiGuitarAcoustic, mdiMinus, mdiPiano, mdiPlus, mdiVectorPolygon, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    aliases: {
      ...aliases,
      dark: mdiWeatherNight,
      light: mdiWeatherSunny,
      logo: mdiPiano,
      piano: mdiPiano,
      guitar: mdiGuitarAcoustic,
      pad: mdiCircleOutline,
      minus: mdiMinus,
      plus: mdiPlus,
    },
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: light,
      },
      dark: {
        colors: dark,
      }
    },
  },
})
// {
//   "name": "taptap",
//   "main": {
//     "hex": "#EFFB8D",
//     "section": "main"
//   },
//   "header": {
//     "hex": "#6BE6F3",
//     "section": "header"
//   },
//   "sidebar": {
//     "hex": "#F87CE7",
//     "section": "sidebar"
//   }
// }
