import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Enable minification with esbuild (faster and included by default)
        minify: 'esbuild',
        // Chunk size warnings
        chunkSizeWarningLimit: 1000,
        // Code splitting optimization
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-charts': ['recharts'],
              'vendor-icons': ['lucide-react'],
            },
            // Optimize chunk file names
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          },
        },
        // Source maps for debugging (disable in production if not needed)
        sourcemap: mode !== 'production',
        // Target modern browsers for better optimization
        target: 'esnext',
        // CSS code splitting
        cssCodeSplit: true,
      },
      // Performance optimizations
      optimizeDeps: {
        include: ['react', 'react-dom', 'recharts', 'lucide-react'],
      },
      // Esbuild options for minification
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
    };
});
