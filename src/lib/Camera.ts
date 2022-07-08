import { PerspectiveCamera } from 'three';

export default class Camera extends PerspectiveCamera {
    constructor() {
        super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.up.set(0, 1, 0);
        // this.position.z = size / 2;
        // this.position.z = 150;
        // this.position.y = 40;
    }
}
