import type { WebGLRenderer, Camera } from 'three';
import { InteractionManager as Manager } from 'three.interactive';

export default class InteractionManager extends Manager {
    constructor(renderer: WebGLRenderer, camera: Camera) {
        super(renderer, camera, renderer.domElement);
    }
}
