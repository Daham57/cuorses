import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// حل مشكلة __dirname في JavaScript (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// إعدادات Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    origin: 'http://localhost:3000',
    allowedHosts: ['9079936e97.ngrok-free.app'], // ✅ فقط اسم الدومين بدون https
    hmr: {
      clientPort: 3000,
    },
  },
});
