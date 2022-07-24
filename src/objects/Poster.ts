import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// @ts-expect-error
// import Digitallica from '@/assets/digitallica.glb';
// import Digitallica from '@/assets/digitallica_poster.glb';
import Digitalbin from '@/assets/digitalbin.glb';
// import Digitalbin from '@/assets/digitalbin_neon.glb';
import { router } from '@/lib';

const loader = new GLTFLoader();

export default class Poster extends THREE.Group {
    declare scene: THREE.Group;
    constructor() {
        super();
        loader.load(Digitalbin, (gltf) => {
            const { scene } = gltf;
            // const scale = 10;
            const scale = 4;
            scene.scale.set(scale, scale, scale);
            this.add(scene);
        });
        
        this.name = '/poster';

        this.addEventListener('click', e => {
            e.stopPropagation();
            router.goTo('/poster');
        })

        this.position.set(0, 12, -25);

    }
}
// export default class Poster extends THREE.Group {
//     declare scene: THREE.Group;
//     constructor() {
//         super();
//         loader.load(Digitallica, (gltf) => {
//             const { scene } = gltf;
//             // const scale = 10;
//             const scale = 6;
//             scene.scale.set(scale, scale, scale);
//             scene.translateZ(-1);
//             this.add(scene);
//         });

//         // this.position.set(0, 15, -25 + 0.7);
        
//         this.position.set(5, 12, -23);
//         this.rotateZ(-.05)
//         this.name = '/poster';

//         this.addEventListener('click', e => {
//             e.stopPropagation();
//             router.goTo('/poster');
//         })
//     }
// }
