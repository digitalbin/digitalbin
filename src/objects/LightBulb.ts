import gsap from 'gsap';
import {
    Mesh,
    Group,
    PointLight,
    AmbientLight,
    SphereBufferGeometry,
    MeshBasicMaterial,
    // TextureLoader,
    // SpriteMaterial,
    // AdditiveBlending,
    // Sprite,
    CylinderBufferGeometry,
} from 'three';
// import GlowPNG from '@/assets/glow.png';

export default class LightBulb extends Group {
    constructor() {
        super();

        // const color = 0xfefce8; // Yellowish
        const color = 0xffffff; // White

        const light = new PointLight(color, 1);
        const light2 = new AmbientLight(color, 0.7);

        const bulbGeometry = new SphereBufferGeometry(0.5, 16, 8);
        const bulbMaterial = new MeshBasicMaterial({
            color,
            transparent: true,
        });
        const bulb = new Mesh(bulbGeometry, bulbMaterial);

        const socketGeometry = new CylinderBufferGeometry(0.2, 0.2, .6, 32);
        const socketMaterial = new MeshBasicMaterial({ color: 0x404040 })
        const socket = new Mesh(socketGeometry, socketMaterial);
        socket.position.setY(.6);        
        bulb.add(socket);

        const cableHeight = 15;
        const cableGeometry = new CylinderBufferGeometry(0.05, 0.05, cableHeight);
        const cableMaterial = new MeshBasicMaterial({ color: 0x404040 })
        const cable = new Mesh(cableGeometry, cableMaterial);
        cable.position.setY(cableHeight/2);        
        bulb.add(cable);

        bulb.position.setY(-cableHeight);

        // const loader = new TextureLoader();
        // loader.load(GlowPNG, (texture) => {
        //     const spriteMaterial = new SpriteMaterial({
        //         map: texture,
        //         color,
        //         transparent: false,
        //         blending: AdditiveBlending,
        //     });

        //     const glow = new Sprite(spriteMaterial);
        //     const scale = 2;
        //     glow.scale.set(scale, scale, scale);
        //     bulb.add(glow);
        // });

        this.add(light, light2, bulb);

        gsap.fromTo(this.rotation, {
            z: -.1,
        }, {
            z: .1,
            duration: 2,
            yoyo: true,
            repeat: Infinity,
            ease: 'sine.inOut',
        });

        this.position.setY(25)
    }
}
