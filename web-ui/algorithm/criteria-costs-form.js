import { LitElement, css, html } from 'lit'

export class CriteriaCostsForm extends LitElement {

  static properties = {

  }

  static styles = css`
  `

  constructor () {
    super ()
  }

  render () {
    return html `
      CUSTO CRITERIOS
    `
  }
}
window.customElements.define('criteria-costs-form', CriteriaCostsForm)
