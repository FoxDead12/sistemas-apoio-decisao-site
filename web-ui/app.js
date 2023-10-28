import { LitElement, css, html } from 'lit'
import './app-layout'
export class App extends LitElement {

  static styles = css `
    :host {
      position: relative;
      display: block;
      width: 100vw;
      height: 100vh;
      overflow-x: hidden;
      scroll-behavior: smooth;

    }

    img {
      position: relative;
      width: 100vw;
      max-width: 100vw;
      height: 100%;
      object-fit: cover;
    }
  `

  constructor() {
    super()
    window.app = this
  }

  render() {
    return html`
      <app-layout/>

    `
  }
}

window.customElements.define('app-component', App)
