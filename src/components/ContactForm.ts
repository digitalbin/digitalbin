const innerHTML = `
<label>
Your email:
<input required type="email" name="email">
</label>
<label>
Your message:
<textarea required name="message"></textarea>
</label>
<button type="submit">Send</button>
`;

export default class ContactForm extends HTMLElement {
    form!: HTMLFormElement;
    status!: HTMLParagraphElement;

    constructor() {
        super();
        this.form = document.createElement('form');
        this.form.innerHTML = innerHTML;
        this.form.onsubmit = this.onSubmit.bind(this);

        this.status = document.createElement('p');
        this.status.classList.add('status');

        this.form.appendChild(this.status);

        this.appendChild(this.form);
    }

    onSubmit(e: SubmitEvent) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const formData = new FormData(target);
        fetch('https://formspree.io/f/xoqbavoq', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => this.setStatus(res.ok))
            .catch(() => this.setStatus(false));
    }

    setStatus(ok: boolean) {
        if (ok) {
            this.status.innerHTML = '> Thanks for reaching out';
            this.form.reset();
        } else {
            this.status.innerHTML = '> Something went wrong, please try again';
        }
    }
}
