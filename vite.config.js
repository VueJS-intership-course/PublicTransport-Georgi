import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import constants from './src/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src'
    }
  },
  server: {
    hmr: true,
    open: true,
    port: 8080,
    proxy: {
      [constants.DEV.API.TRANSPORT.PROXY_PATH]: {
        target: constants.DEV.API.TRANSPORT.BASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const regex = new RegExp(/^\/transport-api/, 'gi');
          // const regex = new RegExp(`^\\${constants.DEV.API.TRANSPORT.PROXY_PATH}`, 'gi');

          return path.replace(regex, '')
        }
      }
    }
  }
})
