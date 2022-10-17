import { Clock } from 'three';
import { Router, InteractionManager } from '@/lib';
import {
    Renderer,
    CSS3DRenderer,
    Scene,
    Camera,
    CameraControls,
} from '@/setup';
import {
    GLTFItem,
    Room,
    TVSet,
    VHSTapes,
    LightBulb,
    Poster,
    Text,
} from '@/objects';

export default class World {
    static #instance: World;

    router!: Router;
    interactionManager!: InteractionManager;
    onReady?: () => void;

    isReady = false;
    renderer = new Renderer();
    css3Drenderer = new CSS3DRenderer();
    scene = new Scene();
    cssScene = new Scene();
    camera = new Camera();
    cameraControls = new CameraControls(this.camera, this.renderer);
    clock = new Clock();

    constructor() {
        if (World.#instance) return World.#instance;
        World.#instance = this;

        this.router = new Router(this.scene, this.cameraControls);
        this.interactionManager = new InteractionManager(
            this.renderer,
            this.camera,
        );

        window.addEventListener('mousemove', this.render);
        window.addEventListener('resize', this.onWindowResize, false);
    }

    private render = () => {
        this.renderer.render(this.scene, this.camera);
        this.css3Drenderer.render(this.cssScene, this.camera);
    };

    private tick = () => {
        const delta = this.clock.getDelta();
        const hasCameraUpdate = this.cameraControls.update(delta);
        this.interactionManager.update();

        if (this.router.isMoving || hasCameraUpdate) this.render();
        if (!this.isReady && this.scene.children.length > 0) this.setIsReady();

        requestAnimationFrame(this.tick);
    };

    private setIsReady = () => {
        this.isReady = true;
        this.css3Drenderer.domElement.style.visibility = 'visible';
        this.onReady?.();
    };

    private generateItems = () => {
        const room = new Room();
        const lightBulb = new LightBulb();
        const poster = new Poster();
        const tvSet = new TVSet();
        const vhsTapes = new VHSTapes(this.scene, tvSet);

        this.scene.add(room, lightBulb, poster, tvSet, vhsTapes);
        this.cssScene.add(tvSet.css3dObject);
    };

    private onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.css3Drenderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    };

    start = () => {
        this.router.handleCurrentPath();
    };

    initialize = async () => {
        await Promise.all([Text.preloadFonts(), GLTFItem.preloadModel()]);
        this.generateItems();
        this.tick();
    };
}
