const innerHTML = `
<label>
Your email:
<input required type="email" name="email" autocomplete="email">
</label>
<label>
Your message:
<textarea required name="message"></textarea>
</label>
<input class="gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
<button type="submit">Send</button>
`;

export default class ContactForm extends HTMLElement {
    form = document.createElement('form');
    status = document.createElement('p');
    button: HTMLButtonElement;

    constructor() {
        super();
        this.form.innerHTML = innerHTML;
        this.form.onsubmit = this.onSubmit;
        this.button = this.form.querySelector('button') as HTMLButtonElement;

        this.status.classList.add('status');
        this.status.setAttribute('role', 'status');
        this.form.appendChild(this.status);
    }

    connectedCallback() {
        this.appendChild(this.form);
    }

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (this.button.disabled) return;

        this.button.disabled = true;
        this.status.textContent = '> Sending...';

        try {
            // _gotcha is Formspree's honeypot: bots fill it in, people never see it
            const res = await fetch('https://formspree.io/f/xoqbavoq', {
                method: 'POST',
                body: new FormData(this.form),
                headers: { Accept: 'application/json' },
            });
            this.setStatus(res.ok);
        } catch {
            this.setStatus(false);
        }
        this.button.disabled = false;
    };

    setStatus(ok: boolean) {
        if (ok) {
            this.status.textContent = '> Thanks for reaching out';
            this.form.reset();
        } else {
            this.status.textContent = '> Something went wrong, please try again';
        }
    }
}
