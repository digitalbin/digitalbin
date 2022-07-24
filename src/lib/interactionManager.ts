import type { Object3D, Renderer, Camera } from 'three';
import { InteractionManager as Manager } from 'three.interactive';

class InteractionManager {
    static manager: Manager;

    // constructor(renderer, camera) {
    //     super(
    //         renderer,
    //         camera,
    //         renderer.domElement,
    //         false,
    //     );
    // }
    
    add(obj: Object3D) {
        InteractionManager.manager.add(obj);
    }
    
    update() {
        InteractionManager.manager.update();
    }

    init(renderer: Renderer, camera: Camera) {
        if (!InteractionManager.manager) {
            InteractionManager.manager = new Manager(renderer, camera, renderer.domElement, false);
        }
    }
}

const manager = new InteractionManager();
export default manager;
