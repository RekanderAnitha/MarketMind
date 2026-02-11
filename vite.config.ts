
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || "")
    },
    optimizeDeps: {
      include: ['recharts', 'react', 'react-dom', '@google/genai'],
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      host: true,
      fs: {
        strict: false
      },
      watch: {
        usePolling: true
      }
    }
  };
});
