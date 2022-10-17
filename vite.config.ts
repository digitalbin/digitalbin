import { defineConfig } from 'vite';
import { resolve } from 'path';
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    // plugins: [visualizer()],
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
