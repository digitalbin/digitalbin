import type { Renderer, Camera } from 'three';
import { InteractionManager as Manager } from 'three.interactive';

export default class InteractionManager extends Manager {
    constructor(renderer: Renderer, camera: Camera) {
        super(renderer, camera, renderer.domElement, false);
    }
}
