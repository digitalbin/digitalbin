import { WebGLRenderer } from 'three';

const canvas = document.querySelector('#three') as HTMLCanvasElement;

export default class Renderer extends WebGLRenderer {
    constructor() {
        super({
            canvas,
            antialias: true,
        });

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
    }
}
