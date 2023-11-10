import { LitElement, css, html } from 'lit'
import {repeat} from 'lit/directives/repeat.js';

export class CriteriaForm extends LitElement {

  static properties = {
    criteriaItems: { type: Array }
  }

  static styles = css`
    :host {
      overflow: auto;
      max-height: 100%;
      display: grid;
      grid-template-columns: 80% auto;
      gap: 24px 12px;
    }

    .header {
      font-family: 'Montserrat';
      margin: 0px;
      font-size: 16px;
      background: #eee;
      padding: 12px;
      border-radius: 2px;
      color: var(--primary-color);
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .row {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 80% auto;
      gap: 12px;
    }

    .row > input {
      font-family: 'Montserrat';
      font-size: 16px;
      border: 0px;
      padding: 0px;
      outline: none;
      border-bottom: 1px solid #d4d4d4;
      padding-bottom: 8px;
    }

    .row > .trash {
      display: flex;
      place-content: center;
      justify-content: center;
      color: #db2b2b;
      cursor: pointer;
      border-radius: 2px;
    }

    .row > .trash:hover  {
      background: #db2b2b;
      color: white;
    }

    .plus-container {
      display: flex;
      justify-content: left;
      align-items: center;
    }

    .plus-container > div {
      display: flex;
      cursor: pointer;
    }

    .plus-container > div:hover {
      border-bottom: 1px solid var(--primary-color);
    }

    .plus-container h5 {
      font-family: 'Montserrat';
      font-size: 16px;
      font-weight: 400;
      color: var(--primary-color);
      margin: 0px;
      padding: 0px;
    }

    .plus-container svg {
      fill: var(--primary-color);
    }
  `

  constructor () {
    super ()

    this.criteriaItems = []
  }

  render () {
    return html `

    <h5 class="header">Nome</h5>
    <h5 class="header">Ação</h5>

    ${repeat(this.criteriaItems, (item) => item.id, (item, idx) => {
      return this.__renderItem(item, idx)
    })}

    <div class="plus-container">
      <div @click=${this.__addItem}>
        <h5>Adicionar Criterio</h5>
        <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    `
  }

  __addItem () {
    let id = 0
    if (this.criteriaItems.length > 0) {
      id = this.criteriaItems[this.criteriaItems.length - 1].id + 1
    }

    const newItem = {name: '', id: id}
    const array = [...this.criteriaItems]
    array.push(newItem)
    this.criteriaItems = array
  }

  __removeItem (idx) {
    this.criteriaItems = this.criteriaItems.filter((item, idxItem) => idxItem !== idx)
  }

  __renderItem (item, idx) {
    return html `
    <div class="row">
      <input required .item="${item}" type="text" placeholder="Criterio" @change=${(e) => this.__changeValue(e, idx)}/>
      <div .value=${item.name} class="trash" @click=${() => this.__removeItem(idx)}>
        <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" /></svg>
      </div>
    </div>
    `
  }

  __changeValue (e, idx) {
    const value = e.currentTarget.value
    this.criteriaItems[idx].name = value
  }

  save () {
    return {criteria: this.criteriaItems}
  }
}
window.customElements.define('criteria-form', CriteriaForm)
