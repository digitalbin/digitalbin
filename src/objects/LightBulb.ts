import gsap from 'gsap';
import {
    Mesh,
    Group,
    Vector3,
    PointLight,
    AmbientLight,
    SphereBufferGeometry,
    MeshBasicMaterial,
    TextureLoader,
    SpriteMaterial,
    AdditiveBlending,
    Sprite,
    PointLightHelper,
} from 'three';

import GlowPNG from '@/assets/glow.png';

export default class LightBulb extends Group {
    constructor() {
        super();

        const yellow = 0xfefce8;
        // const white = 0xffffff;
        const color = yellow;

        const position = new Vector3(0, 10, 0);

        const light = new PointLight(color, 1);
        const light2 = new AmbientLight(color, 0.3);

        const geometry = new SphereBufferGeometry(0.5, 16, 8);
        const material = new MeshBasicMaterial({
            color,
            transparent: true,
        });

        const bulb = new Mesh(geometry, material);

        const loader = new TextureLoader();
        loader.load(GlowPNG, (texture) => {
            const spriteMaterial = new SpriteMaterial({
                map: texture,
                color,
                transparent: false,
                blending: AdditiveBlending,
            });

            const glow = new Sprite(spriteMaterial);
            const scale = 2;
            glow.scale.set(scale, scale, scale);
            bulb.add(glow);
        });

        const helper = new PointLightHelper(light, 2, 0x00ff00);

        this.add(light, light2, bulb, helper);
        this.position.copy(position);

        gsap.fromTo(this.position, {
            x: -1,
        }, {
            x: 1,
            duration: 2,
            yoyo: true,
            repeat: Infinity,
            ease: 'sine.inOut',
            // yoyoEase: 'sine.inOut',
        });
    }
}
