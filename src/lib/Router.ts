import { Scene, Object3D } from 'three';

class Router {
    scene: Scene;
    currentlyInserted: Object3D | undefined;

    constructor(scene: Scene) {
        this.scene = scene;

        window.addEventListener('popstate', this.goToCurent.bind(this))
    }

    private navigate(path: string) {
        window.history.pushState({}, '', path);
    }

    private goToCurent() {
        const path = window.location.pathname;
        this.goTo(path, false);
    }

    public goTo(path: string, navigate = true) {
        const targetVhs = this.scene.getObjectByName(path);
        
        if (this.currentlyInserted?.id !== targetVhs?.id) {
            this.currentlyInserted?.userData.animations.onDeSelect();
        }
        targetVhs?.userData.animations.onSelect();

        this.currentlyInserted = targetVhs;

        if (navigate) this.navigate(path);
    }

    public init() {
        this.goToCurent();
    }
}

export default Router;
