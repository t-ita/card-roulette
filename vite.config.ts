import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/card-roulette/', // baseプロパティを追加
  plugins: [react()],
})
