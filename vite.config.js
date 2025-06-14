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
    // allowedHosts: [
    //   '1328-157-51-4-160.ngrok-free.app'
    // ],
    proxy: {
      '/api': {
        target: 'https://smartattendance.shinecrafttechnologies.com',
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

