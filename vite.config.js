import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // server: {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"],
  //     allowedHeaders: ["Content-Type", "X-Client-Id"],
  //     preflightContinue: true,
  //     credentials: true,
  //   },
  //   proxy: {

  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
