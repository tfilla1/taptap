// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      manifest: true,
      // Other build options...
    },
    rollupInputOptions: {
      input: {
        main: 'src/main.ts',
        ...(mode !== 'development' && {
          excludeFolder: ['src/examples/**', 'src/db/**', 'src/assets/diagrams/**'] // Exclude the folder when not in development
        })
      },
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      ViteFonts({
        google: {
          families: [{
            name: 'Questrial',
            styles: 'wght@100;300;400;500;700;900',
          }],
        },
      }),
    ],
    define: {
      'process.env': {},
      __APP_ENV__: env.APP_ENV
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      port: 3420,
    },
  }
})
