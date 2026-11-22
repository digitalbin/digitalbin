import type { LoadingScreen } from '@/components';

const loadingScreen = document.querySelector('loading-screen') as LoadingScreen;

// three.js and the scene are most of the bundle, so they load in their own
// chunk while the loading screen is already on screen.
import('@/World').then(({ default: World }) => {
    const world = new World();

    world.onReady = () => {
        loadingScreen.setAttribute('ready', '');
    };

    loadingScreen.addEventListener('onstart', () => {
        world.start();
    });

    world.initialize();
});

const favIcons = [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8c3R5bGU+CiAgICAgICAgcGF0aCB7CiAgICAgICAgICAgIGZpbGw6ICMxMTE4Mjc7CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7CiAgICAgICAgICAgIHBhdGggewogICAgICAgICAgICAgICAgZmlsbDogI2Y5ZmFmYjsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBkPSJNMjgzIDI5MC4wODNMNDguMzg0MiAzODlMMjcgMzIzLjA1NUwxOTguNjg1IDI1Ni41TDI3IDE4OS45NDVMNDguMzg0MiAxMjRMMjgzIDIyMi4zMDZWMjkwLjA4M1oiCiAgICAgICAgZmlsbD0iIzExMTgyNyIgLz4KICAgIDxwYXRoIGQ9Ik0zMjcgMTI0SDQ3OVYzODlIMzI3VjEyNFoiIGZpbGw9IiMxMTE4MjciIC8+Cjwvc3ZnPg==',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8c3R5bGU+CiAgICAgICAgcGF0aCB7CiAgICAgICAgICAgIGZpbGw6ICMxMTE4Mjc7CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7CiAgICAgICAgICAgIHBhdGggewogICAgICAgICAgICAgICAgZmlsbDogI2Y5ZmFmYjsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBkPSJNMjgzIDI5MC4wODNMNDguMzg0MiAzODlMMjcgMzIzLjA1NUwxOTguNjg1IDI1Ni41TDI3IDE4OS45NDVMNDguMzg0MiAxMjRMMjgzIDIyMi4zMDZWMjkwLjA4M1oiCiAgICAgICAgZmlsbD0iIzExMTgyNyIgLz4KPC9zdmc+'
];
const faviconElm = document.querySelector('link[rel="icon"]')
let i = 0;

setInterval(() => {
    faviconElm?.setAttribute('href', favIcons[i]);
    i += i ? -1 : 1;
}, 1000);
