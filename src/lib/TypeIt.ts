interface ExtText extends Text {
    __originalText: string;
}

export default class TypeIt {
    textBlocks: HTMLElement[];
    stopped = false;

    constructor(element: Element) {
        this.textBlocks = Array.from(element.childNodes) as HTMLElement[];
        
        this.textBlocks.forEach((node) => {
            if (node.style) node.style.visibility = 'hidden';
            this.extendTextNodes(node);
        });
    }

    extendTextNodes = (element: ChildNode) => {
        for (const node of Array.from(element.childNodes)) {
            if (Boolean(node.childNodes.length)) {
                this.extendTextNodes(node);
            } else {
                const textNode = node as ExtText;
                textNode.__originalText = textNode.textContent || '';
                textNode.textContent = '';
            }
        }
    };

    resetTextNodes = (element: ChildNode) => {
        for (const node of Array.from(element.childNodes)) {
            if (Boolean(node.childNodes.length)) {
                this.resetTextNodes(node);
            } else {
                const textNode = node as ExtText;
                textNode.textContent = textNode.__originalText;
            }
        }
    };

    start = async () => {
        window.addEventListener('click', this.stop, { once: true });

        for (const textBlock of this.textBlocks) {
            if (this.stopped) break;
            textBlock.style.visibility = 'visible';
            await this.traverse(textBlock);
        }

    };

    stop = () => {
        this.stopped = true;
        this.textBlocks.forEach((node) => {
            node.style.visibility = 'visible';
            this.resetTextNodes(node);
        });
    }

    traverse = async (element: ChildNode) => {
        for (const node of Array.from(element.childNodes)) {
            if (this.stopped) break;
            if (Boolean(node.childNodes.length)) {
                await this.traverse(node);
            } else {
                const textNode = node as ExtText;
                await this.typeOut(textNode);
            }
        }
    };

    typeOut = async (node: ExtText) => {
        let i = 0;
        await new Promise((resolve) => {
            let interval = setInterval(() => {
                const char = node.__originalText[i];
                if (char && !this.stopped) node.textContent += char;
                else {
                    clearInterval(interval);
                    resolve(null);
                }
                i++;
            }, 20);
        });
    };
}
