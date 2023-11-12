import { LitElement, css, html, render } from 'lit'
import './form/app-form.js'

export class AppDashboard extends LitElement {

  static properties = {
  }

  static styles = css `
  `

  constructor () {
    super ()
  }

  firstUpdated () {
    this.shadowRoot.addEventListener('keydown', function(event) {
      if (event.keyCode === 9 && event.target.tagName === 'APP-FORM') {
        event.preventDefault();
      }
    });
  }

  render () {
    return html `
      <app-form></app-form>
    `
  }
}
window.customElements.define('app-dashboard', AppDashboard)
