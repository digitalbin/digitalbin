import { Text as TroikaText } from 'troika-three-text';

const fonts = [
    'https://fonts.gstatic.com/s/rocksalt/v18/MwQ0bhv11fWD6QsAVOZbsw.woff',
    'https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004Hak.woff',
    'https://fonts.gstatic.com/s/waitingforthesunrise/v16/WBL1rFvOYl9CEv2i1mO6KUW8RKWJ2zoXoz5JsYZT.woff',
];

export default class Text extends TroikaText {
    constructor(text: string, size: number) {
        super();
        this.text = text;
        this.font = fonts[Math.floor(Math.random() * fonts.length)];
        this.fontSize = size;
        this.anchorX = 'center';
        this.anchorY = 'middle';
        this.depthOffset = -1;
        // this.position.copy(label.position);
        this.color = 0x111827;
    }
}

// const text = new Text();
