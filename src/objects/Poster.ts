import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import World from '@/World';
// @ts-expect-error
// import Digitallica from '@/assets/digitallica.glb';
// import Digitallica from '@/assets/digitallica_poster.glb';
import Digitalbin from '@/assets/digitalbin.glb';
// import Digitalbin from '@/assets/digitalbin_neon.glb';

const loader = new GLTFLoader();

export default class Poster extends Group {
    constructor() {
        super();

        loader.load(Digitalbin, (gltf) => {
            const { scene } = gltf;
            this.add(scene);
        });

        this.name = '404';
        const world = new World();

        this.addEventListener('click', (e) => {
            e.stopPropagation();
            world.router.goTo(this.name);
        });

        world.interactionManager.add(this);

        this.scale.set(4, 4, 4);
        this.position.set(0, 12, -25);
    }
}
