import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'src/assets/[name].[ext]'
      }
    }
  }
})
