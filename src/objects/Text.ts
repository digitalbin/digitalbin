import { Object3D } from 'three';
import { Text as TroikaText, preloadFont } from 'troika-three-text';
import PermanentMarker from '/fonts/permanentmarker.woff';
import Rocksalt from '/fonts/rocksalt.woff';
import WaitingForTheSunrise from '/fonts/waitingforthesunrise.woff';
import UbuntuMono from '/fonts/UbuntuMono-Regular.ttf';

const fonts = [
    PermanentMarker,
    Rocksalt,
    WaitingForTheSunrise,
];

export default class Text extends Object3D {
    constructor(text: string, size: number, isLabel = false) {
        super();
        const _text = new TroikaText();
        _text.text = text;
        if (isLabel) _text.font = UbuntuMono;
        else _text.font = fonts[Math.floor(Math.random() * fonts.length)];
        _text.fontSize = size;
        _text.anchorX = 'center';
        _text.anchorY = 'middle';
        _text.depthOffset = -1;
        _text.color = 0x111827;

        _text.sync();
        this.add(_text);
    }

    static preloadFonts() {
        return new Promise((resolve, _reject) => {
            // preloadFont({ font: UbuntuMono }, () => {});
            let done = 0;
            fonts.forEach(font => {
                preloadFont({
                    font,
                }, () => {
                    done += 1;
                    if (done === fonts.length) resolve(done);
                });
            })
        })
    }
}

