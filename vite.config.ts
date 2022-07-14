import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    assetsInclude: ['**/*.glb'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
