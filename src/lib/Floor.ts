import { Mesh, PlaneBufferGeometry, MeshBasicMaterial, DoubleSide } from 'three';

export default class Floor extends Mesh {
    constructor() {
        const floorGeometry = new PlaneBufferGeometry(100, 100);
        const floorMaterial = new MeshBasicMaterial({
            color: 0xeeeeee,
            side: DoubleSide,
        });

        super(floorGeometry, floorMaterial);
        this.rotateX(-Math.PI / 2);
    }
}
