import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  base: './', // o './' si lo vas a desplegar con Netlify manualmente
  plugins: [react()],
})
