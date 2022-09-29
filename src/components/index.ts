import ContactForm from './ContactForm';
import LoadingScreen from './LoadingScreen';
import BoringButton from './BoringButton';

customElements.define('contact-form', ContactForm);
customElements.define('loading-screen', LoadingScreen);
customElements.define('boring-button', BoringButton);

export { default as ContactForm } from './ContactForm';
export { default as LoadingScreen } from './LoadingScreen';
export { default as BoringButton } from './BoringButton';