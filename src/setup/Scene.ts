import { Scene as _Scene, Color } from "three";

export default class Scene extends _Scene {
    constructor() {
        super();
        this.background = new Color(0xffffff);
        this.scale.set(10, 10, 10);
    }
}
