import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default function createCSSRenderer() {
    const element = document.getElementById('app') || undefined;
    const cssRenderer = new CSS3DRenderer({ element });
    // const cssRenderer = new CSS2DRenderer({ element });
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    // cssRenderer.domElement.style.position = 'absolute';
    // cssRenderer.domElement.style.top = '0px';
    // document.body.appendChild(cssRenderer.domElement);
    return cssRenderer;
}
