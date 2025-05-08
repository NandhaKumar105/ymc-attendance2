import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '817d-2409-40f4-14c-bca6-a101-1259-5f13-ea86.ngrok-free.app'
    ],
    proxy: {
      '/api': {
        target: 'https://attendance-eight-sand.vercel.app',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
        secure: false,
       
      },
    },
  },
})

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'https://attendance-eight-sand.vercel.app',
//     },
//   },
// });

