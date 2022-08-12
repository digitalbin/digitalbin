import type { CameraControls } from '@/setup';
import type { Scene, Object3D } from 'three';

export default class Router {
    scene: Scene;
    cameraControls: CameraControls;
    currentTarget: Object3D | undefined;
    isMoving: boolean;

    constructor(scene: Scene, cameraControls: CameraControls) {
        if (!window.onpopstate) window.onpopstate = this.handleCurrentPath;
        this.isMoving = false;
        this.scene = scene;
        this.cameraControls = cameraControls;
    }

    #handleAnimation = async (path: string) => {
        const targetName = path.replace('/', '') || 'home';
        const newTarget =
            this.#getTargetObject(targetName) || this.#getTargetObject('404');
        if (!newTarget) return;

        this.isMoving = true;

        this.currentTarget?.userData.print?.off();

        await Promise.all([
            this.cameraControls.navigateTo(
                newTarget.userData?.viewTarget || newTarget,
            ),
            newTarget.userData.animation?.play(),
            this.currentTarget?.userData.animation?.reverse(),
        ]);

        newTarget.userData.print?.on();

        this.currentTarget = newTarget;
        this.isMoving = false;
    };

    #getTargetObject = (name: string) => {
        return this.scene.getObjectByName(name);
    };

    handleCurrentPath = () => {
        if (this.isMoving) return;
        const path = window.location.pathname;
        this.#handleAnimation(path);
    };

    goTo = (path: string) => {
        if (path === window.location.pathname || this.isMoving) return;
        window.history.pushState({}, '', path);
        this.#handleAnimation(path);
    };
}
