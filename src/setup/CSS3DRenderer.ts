import { CSS3DRenderer as _CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

const element = document.querySelector('#app') as HTMLElement;

export default class CSS3DRenderer extends _CSS3DRenderer {
    constructor() {
        super({ element });
        this.setSize(window.innerWidth, window.innerHeight);
    }
}