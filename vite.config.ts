import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    assetsInclude: ['**/*.glb'],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                minimal: resolve(__dirname, 'minimal.html'),
            }
        }
    }
});
