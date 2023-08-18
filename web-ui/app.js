import { LitElement, css, html } from 'lit'

export class App extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
      <h1>BEM-VINDO A APP</h1>
    `
  }
}

window.customElements.define('app-component', App)
