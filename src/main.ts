import '@/styles/global.css';
import '@/components';
import type { LoadingScreen } from '@/components';
import World from '@/World';
import fav0 from '/fav0.svg';
import fav1 from '/fav1.svg';

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

const favIcons = [fav0, fav1];

setInterval(() => {
    favicon?.setAttribute('href', favIcons[i]);
    i += i ? -1 : 1;
}, 1000);
