import { LitElement, css, html } from 'lit'
import './app-header'
import './app-hero'

export class AppLayout extends LitElement {

  static styles = css `
    :host {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }
  `

  constructor() {
    super()
  }

  render () {
    return html `
      <app-header></app-header>
      <app-hero></app-hero>
    `
  }

}
window.customElements.define('app-layout', AppLayout)
