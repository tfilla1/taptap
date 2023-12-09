/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAbacus, mdiAirplane, mdiMinus, mdiPiano, mdiPlus, mdiVectorPolygon, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    aliases: {
      ...aliases,
      dark: mdiWeatherNight,
      light: mdiWeatherSunny,
      logo: mdiPiano,
      piano: mdiPiano,
      drumpad: mdiVectorPolygon,
      minus: mdiMinus,
      plus: mdiPlus,
      testing: mdiAirplane,
      lame: mdiAbacus
    },
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#7CE7F8',
          secondary: '#F87CE7',
        },
      },
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
