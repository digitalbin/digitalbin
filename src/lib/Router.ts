import type { CameraControls } from '@/setup';
import type { Scene, Object3D } from 'three';

class Router {
    static #scene: Scene;
    static #cameraControls: CameraControls;
    currentTarget: Object3D | undefined;

    constructor() {
        if (!window.onpopstate) window.onpopstate = this.handleCurrentPath;
    }

    #handleAnimation = async (path: string) => {
        const newTarget = this.#getTargetObject(path);
        if (!newTarget) return; // HANDLE 404 OR SOME SHIT

        this.currentTarget?.userData.print?.off();

        await Promise.all([
            Router.#cameraControls.navigateTo(newTarget.userData?.viewTarget || newTarget),
            newTarget.userData.animation?.play(),
            this.currentTarget?.userData.animation?.reverse(),
        ])

        newTarget.userData.print?.on();
        
        this.currentTarget = newTarget;
    };

    #getTargetObject = (name: string) => {
        return Router.#scene.getObjectByName(name);
    };

    handleCurrentPath = () => {        
        const path = window.location.pathname;
        this.#handleAnimation(path);
    };

    goTo = (path: string) => {
        window.history.pushState({}, '', path);
        this.#handleAnimation(path);
    };

    init(scene: Scene, cameraControls: CameraControls) {
        Router.#scene = scene;
        Router.#cameraControls = cameraControls;
    }
}

const router = new Router();
export default router;
