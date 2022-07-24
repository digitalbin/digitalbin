import { Object3D } from 'three';
import { Text as TroikaText } from 'troika-three-text';
import PermanentMarker from '@/assets/fonts/permanentmarker.woff';
import Rocksalt from '@/assets/fonts/rocksalt.woff';
import WaitingForTheSunrise from '@/assets/fonts/waitingforthesunrise.woff';

const fonts = [
    PermanentMarker,
    Rocksalt,
    WaitingForTheSunrise,
];

export default class Text extends Object3D {
    constructor(text: string, size: number) {
        super();
        const _text = new TroikaText();
        _text.text = text;
        _text.font = fonts[Math.floor(Math.random() * fonts.length)];
        _text.fontSize = size;
        _text.anchorX = 'center';
        _text.anchorY = 'middle';
        _text.depthOffset = -1;
        _text.color = 0x111827;
        this.add(_text);
    }
}

