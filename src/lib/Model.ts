import { Object3D } from 'three';

export default class Model3D extends Object3D {
    constructor(model: Object3D) {
        super();
        model.children.forEach(child => this.add(child));
    }
}