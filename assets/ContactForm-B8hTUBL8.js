(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`
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
`,t=class extends HTMLElement{form=document.createElement(`form`);status=document.createElement(`p`);button;constructor(){super(),this.form.innerHTML=e,this.form.onsubmit=this.onSubmit,this.button=this.form.querySelector(`button`),this.status.classList.add(`status`),this.status.setAttribute(`role`,`status`),this.form.appendChild(this.status)}connectedCallback(){this.appendChild(this.form)}onSubmit=async e=>{if(e.preventDefault(),!this.button.disabled){this.button.disabled=!0,this.status.textContent=`> Sending...`;try{let e=await fetch(`https://formspree.io/f/xoqbavoq`,{method:`POST`,body:new FormData(this.form),headers:{Accept:`application/json`}});this.setStatus(e.ok)}catch{this.setStatus(!1)}this.button.disabled=!1}};setStatus(e){e?(this.status.textContent=`> Thanks for reaching out`,this.form.reset()):this.status.textContent=`> Something went wrong, please try again`}};export{t};