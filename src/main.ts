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

const favicon = document.querySelector('link[rel="icon"]')
let i = 0;

setInterval(() => {
    favicon?.setAttribute('href', `/fav${i}.svg`);
    if (i) i = 0;
    else i = 1;
}, 1000);
