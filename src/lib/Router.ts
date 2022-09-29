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

    #handleAnimation = async () => {
        const targetName = this.getCurrentPath();
        const newTarget =
            this.#getTargetObject(targetName) || this.#getTargetObject('404');
        if (!newTarget || this.isMoving) return;

        this.onRouteChange();

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
        
        // Check if user hasn't pushed back before the animation is done
        const currentPath = this.getCurrentPath();
        if (targetName !== currentPath && newTarget.name !== '404') {
            this.handleCurrentPath();
        }
    };

    #getTargetObject = (name: string) => {
        return this.scene.getObjectByName(name);
    };

    handleCurrentPath = () => {
        const path = this.getCurrentPath();
        if (this.currentTarget?.name === path || this.isMoving) return;
        this.#handleAnimation();
    };

    goTo = (path: string) => {
        if (path === this.getCurrentPath() || this.isMoving) return;
        window.history.pushState({}, '', path);
        this.#handleAnimation();
    };

    getCurrentPath = (): string => {
        return window.location.pathname.replace('/', '') || 'index';
    }

    onRouteChange = () => {
        const event = new Event('onroutechange');
        window.dispatchEvent(event);
    }
}
