import { Mesh, BoxBufferGeometry, MeshStandardMaterial, BackSide } from 'three';

export default class Room extends Mesh {
    size = 50;
    height = this.size / 2;
    constructor() {
        super();
        const geometry = new BoxBufferGeometry(
            this.size,
            this.height,
            this.size,
        );
        const material = new MeshStandardMaterial({
            color: 0x737373,
            side: BackSide,
        });

        this.geometry = geometry;
        this.material = material;
        this.position.setY(this.height / 2);

        // this.rotateX(-Math.PI / 2);
    }
}
