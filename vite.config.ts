import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths work both on GitHub Pages project sites and local previews.
export default defineConfig({ plugins: [react()], base: './' });
