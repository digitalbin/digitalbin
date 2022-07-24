import { Mesh, BoxBufferGeometry, MeshStandardMaterial, BackSide } from 'three';

export default class Room extends Mesh {
    size = 50;
    height = this.size / 2;
    constructor() {
        super();
        this.geometry = new BoxBufferGeometry(
            this.size,
            this.height,
            this.size,
        );
        this.material = new MeshStandardMaterial({
            color: 0x737373,
            side: BackSide,
        });

        this.position.setY(this.height / 2);
    }
}
