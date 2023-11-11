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
  }

  render () {
    return html `
      <app-form></app-form>
    `
  }
}
window.customElements.define('app-dashboard', AppDashboard)
