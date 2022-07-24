import '@/styles/global.css';
import { Clock } from 'three';
import { router, interactionManager, animate } from '@/lib';
import { Renderer, CSS3DRenderer, Scene, Camera, CameraControls } from '@/setup';
import { GLTFItem, Room, TVSet, VHSTapes, LightBulb, Poster } from '@/objects';

const renderer = new Renderer();
const css3Drenderer = new CSS3DRenderer();
const scene = new Scene();
const cssScene = new Scene();
const camera = new Camera();
const cameraControls = new CameraControls(camera, renderer);
const clock = new Clock();

async function initialize() {
    router.init(scene, cameraControls);
    interactionManager.init(renderer, camera);
    await GLTFItem.init();
}

function generateItems() {
    const room = new Room();
    const lightBulb = new LightBulb()
    const poster = new Poster();
    const tvSet = new TVSet();
    const vhsTapes = new VHSTapes(scene, tvSet);

    scene.add(room, lightBulb, poster, tvSet, vhsTapes);
    cssScene.add(tvSet.css3dObject);
}

initialize()
    .then(generateItems)
    .then(router.handleCurrentPath)

animate((_delta) => {
    const delta = clock.getDelta();
    cameraControls.update(delta);
    interactionManager.update();
    
    renderer.render(scene, camera);
    css3Drenderer.render(cssScene, camera);
});