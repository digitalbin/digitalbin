import '@/styles/global.css';
import '@/components';
import type { LoadingScreen } from '@/components';
import World from '@/World';

const world = new World();

const loadingScreen = document.querySelector('loading-screen') as LoadingScreen;

world.initialize();

world.onReady = () => {
    loadingScreen.setAttribute('ready', '');
}

loadingScreen.addEventListener('onstart', () => {
    world.start();
});
