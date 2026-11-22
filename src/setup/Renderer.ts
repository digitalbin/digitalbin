import { WebGLRenderer, ColorManagement, LinearSRGBColorSpace } from 'three';

// The scene's colors and light were tuned without color management,
// keep rendering them that way.
ColorManagement.enabled = false;

const canvas = document.querySelector('#three') as HTMLCanvasElement;

export default class Renderer extends WebGLRenderer {
    constructor() {
        super({
            canvas,
            antialias: true,
        });

        this.outputColorSpace = LinearSRGBColorSpace;
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
    }
}
