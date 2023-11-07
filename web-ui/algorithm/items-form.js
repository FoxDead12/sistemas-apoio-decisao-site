import { LitElement, css, html } from 'lit'

export class ItemsForm extends LitElement {

  static properties = {

  }

  static styles = css`
  `

  constructor () {
    super ()
  }

  render () {
    return html `
    ITEMS
    `
  }
}
window.customElements.define('items-form', ItemsForm)
