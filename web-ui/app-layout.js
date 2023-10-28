import { LitElement, css, html } from 'lit'
import './app-header'
import './app-hero'
import './app-about'
import './app-product'
import './app-plans'

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
      <app-about></app-about>
      <app-product></app-product>
      <app-plans></app-plans>
    `
  }

}
window.customElements.define('app-layout', AppLayout)
