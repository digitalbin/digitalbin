import '@/styles/global.css';
import { Clock } from 'three';
import { router, interactionManager } from '@/lib';
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

class World {
    isReady: boolean;
    renderer: Renderer;
    css3Drenderer: CSS3DRenderer;
    scene: Scene;
    cssScene: Scene;
    camera: Camera;
    cameraControls: CameraControls;
    clock: Clock;

    constructor() {
        this.isReady = false;
        this.renderer = new Renderer();
        this.css3Drenderer = new CSS3DRenderer();
        this.scene = new Scene();
        this.cssScene = new Scene();
        this.camera = new Camera();
        this.cameraControls = new CameraControls(this.camera, this.renderer);
        this.clock = new Clock();

        window.addEventListener('mousemove', this.render);
        window.addEventListener('resize', this.onWindowResize, false);
    }

    render = () => {
        this.renderer.render(this.scene, this.camera);
        this.css3Drenderer.render(this.cssScene, this.camera);
    }

    tick = () => {
        const delta = this.clock.getDelta();
        const hasCameraUpdate = this.cameraControls.update(delta);
        interactionManager.update();
        if (router.isMoving || hasCameraUpdate) {
            this.render();
        }
        if (!this.isReady && this.scene.children.length > 0) {
            this.ready();
        }
        requestAnimationFrame(this.tick);
    }

    ready = () => {
        this.isReady = true;
        document.body.classList.remove('brtl');
    }

    generateItems = () => {
        const room = new Room();
        const lightBulb = new LightBulb();
        const poster = new Poster();
        const tvSet = new TVSet();
        const vhsTapes = new VHSTapes(this.scene, tvSet);
    
        this.scene.add(room, lightBulb, poster, tvSet, vhsTapes);
        this.cssScene.add(tvSet.css3dObject);
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.css3Drenderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }

    load = async () => {
        router.init(this.scene, this.cameraControls);
        interactionManager.init(this.renderer, this.camera);
        await Promise.all([Text.init(), GLTFItem.init()]);
    }

    initialize = async () => {
        await this.load();
        this.generateItems();
        router.handleCurrentPath();
        this.tick();
    }
}

const world = new World();
world.initialize();
