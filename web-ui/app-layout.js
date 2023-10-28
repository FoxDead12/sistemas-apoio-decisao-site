import { LitElement, css, html } from 'lit'
import './app-header'
import './app-hero'
import './app-about'
import './app-product'
import './app-plans'
import './app-contact'
import './app-news-letter'

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
      <app-header .layout=${this}></app-header>
      <app-hero></app-hero>
      <app-about id="about"></app-about>
      <app-product id="product"></app-product>
      <app-plans id="plans"></app-plans>
      <app-news-letter></app-news-letter>
      <app-contact id="contact"></app-contact>
    `
  }

  scrollToItem (idItem) {
    const elementToGo = this.shadowRoot.getElementById(idItem)
    elementToGo.scrollIntoView(elementToGo)

  elementToGo.style.scrollMargin = "75px"; // Set the desired margin
  elementToGo.scrollIntoView();
  }
}
window.customElements.define('app-layout', AppLayout)
