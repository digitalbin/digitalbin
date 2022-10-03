const innerHTML = `
    <div>
        <a href="${import.meta.env.BASE_URL}/minimal.html">&#62;</a>
    </div>
`;

export default class BoringButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = innerHTML;
        window.addEventListener('onroutechange', () => {
            const route = window.location.pathname;
            this.style.display = route === import.meta.env.BASE_URL ? 'block' : 'none';
        })
    }
}
