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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#EFFB8D',
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
