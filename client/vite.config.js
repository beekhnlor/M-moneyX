import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path" // 1. Import path เข้ามา

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. เพิ่มส่วนนี้เข้าไป
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})