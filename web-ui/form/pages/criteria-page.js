import { LitElement, css, html, render } from 'lit'
import {repeat} from 'lit/directives/repeat.js';

export class CriteriaPage extends LitElement {

  static properties = {
    loading: { type: Boolean },
    wizard: { type: Object }
  }

  static styles = css `
    .header {
      display: grid;
      grid-template-columns: 85% auto;
      gap: 15px
    }

    .header > h5 {
      background: #eee;
      padding: 12px;
      margin: 0px;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary-color);
      border-radius: 3px;
      font-family: 'Montserrat';
    }

    .text-add {
      font-family: 'Montserrat';
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: left;
      color: var(--primary-color);
      user-select: none;
      cursor: pointer;
      padding: 0px;
      margin: 0px;
      width: 170px;
    }

    .text-add > p > svg {
      margin-left: 4px;
      stroke: var(--primary-color);
    }

    .text-add > p {
      display: flex;
      align-items: center;
      justify-content: left;
      padding-bottom: 1px;
    }

    .text-add:hover > p {
      border-bottom: 1px solid var(--primary-color);
    }

    .text-add:active {
      color: var(--secondary-color);
    }

    .text-add:active > p {
      border-bottom: 1px solid var(--secondary-color);
    }

    .text-add:active > p > svg {
      stroke: var(--secondary-color);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 28px;
      margin-top: 28px;
    }

    .row {
      display: grid;
      grid-template-columns: 85% auto;
      gap: 15px
    }

    .row:last-child  {
      margin-bottom: 24px;
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
      color: #d4d4d4;
      cursor: pointer;
      margin: auto;
      transition: 100ms all ease-in-out;
      user-select: none;
    }

    .row > .trash:active {
      transform: scale(0.9);
    }

    .row > .trash > svg {
      transform: scale(1.2);
    }

    .row > .trash:hover > svg {
      color: #F25757;
    }

    @media only screen and (max-width: 800px) {
      .header {
        grid-template-columns: 80% auto;
      }

      .header > h5 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .row {
        grid-template-columns: 80% auto;
      }
    }
  `

  constructor () {
    super ()

    this.loading = true
    this.maxItems = 8
  }

  firstUpdated () {
    this.wizard.criteria = []
    this.loading = false
  }

  render () {
    if (this.loading == true) return
    return html `
      <div class="header">
        <h5>Nome</h5>
        <h5>Apagar</h5>
      </div>

      <div class="list">
        ${repeat(this.wizard.criteria, (item) => item.id, (item, idx) => {
          return html `
            <div class="row">
              <input placeholder="Nome criterio" type="text" @change=${this.__change} index="${idx}" .value=${item.name} />
              <span @click=${this.__remove} index="${idx}" class="trash">
                <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
              </span>
            </div>
          `
        })}
      </div>

      <span class="text-add" @click=${this.__add}>
        <p>Adicionar Criterio
          <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </p>
      </span>
    `
  }

  __add () {
    if (this.wizard.criteria.length >= this.maxItems) return;

    let id = 0
    if (this.wizard.criteria.length > 0) {
      id = this.wizard.criteria[this.wizard.criteria.length - 1].id + 1
    }

    this.wizard.criteria.push({name: '', id: id})
    this.requestUpdate()
  }

  __remove (e) {
    if (!e.currentTarget) return
    const index = Number(e.currentTarget.getAttribute('index'))
    this.wizard.criteria = this.wizard.criteria.filter((_, idx) => index != idx)
    this.requestUpdate()
  }

  __change (e) {
    if (!e.currentTarget) return
    const index = Number(e.currentTarget.getAttribute('index'))
    this.wizard.criteria[index].name = e.currentTarget.value
  }

  validate () {
    if (this.wizard.criteria.length < 2) {
      throw 'Insira pelo menos dois criterios!'
    }

    this.wizard.criteria.map (item => {
      if (item.name === '' || !item.name) {
        throw 'Preencha todos os campos!'
      }
    })
  }
}
window.customElements.define('criteria-page', CriteriaPage)
