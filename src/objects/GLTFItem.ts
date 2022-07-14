import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getSize } from '@/utils';
// @ts-expect-error
import GLB from '@/assets/vhs_vcr_crt.glb';

export default class GLTFItem extends Group {
    static #model: Group;

    constructor(key: string | string[]) {
        super();
        if (Array.isArray(key)) {
            const objects = key.map(GLTFItem.getObjectByName);
            this.add(...objects);
            return this;
        }
        const object = GLTFItem.getObjectByName(key);
        return object;
    }

    static getObjectByName(key: string) {
        const object = GLTFItem.#model.getObjectByName(key)?.clone() as Group;
        return object || console.warn('No model with that key: ', key);
    }

    static async init() {
        if (!GLTFItem.#model) {
            const loader = new GLTFLoader();
            const gltf = await loader.loadAsync(GLB);
            gltf.scene.traverse(child => {
                child.userData.size = getSize(child);
            });
            GLTFItem.#model = gltf.scene;
        }
    }
}