// The markup lives in index.html so the intro paints before any script runs.
export default class LoadingScreen extends HTMLElement {
    btn = this.querySelector('button') as HTMLButtonElement;

    connectedCallback() {
        this.btn.addEventListener('click', this.handleOnStart);
    }

    disconnectedCallback() {
        this.btn.removeEventListener('click', this.handleOnStart);
    }

    attributeChangedCallback(name: string) {
        if (name === 'ready') {
            this.btn.removeAttribute('disabled');
            this.btn.innerHTML = '&#60;start&#62;';
        }
    }

    static get observedAttributes() {
        return ['ready'];
    }

    handleOnStart = () => {
        this.dispatchEvent(new Event('onstart'));
        this.remove();
    };
}
