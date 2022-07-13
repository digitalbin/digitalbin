import { MathUtils } from 'three';
import GLTFItem from './GLTFItem';
import Sticker from './Sticker';

interface PageItem {
    name: string;
    slug: string;
}

export default class VHSTape extends GLTFItem {
    static #index = -1;
    rotationOffset: number;

    constructor({ name, slug }: PageItem) {
        super('VHS');
        VHSTape.#index++;

        this.name = slug;
        this.userData = {
            ...this.userData,
            active: false,
        }

        this.position.setY(VHSTape.#index * this.userData.size.y);
        this.rotationOffset = MathUtils.randFloat(
            MathUtils.degToRad(-30),
            MathUtils.degToRad(30),
        );
        this.rotateY(this.rotationOffset);

        const sticker = new Sticker(name, this.userData.size);
        this.add(sticker);
    }
}
