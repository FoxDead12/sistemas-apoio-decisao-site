import { LitElement, css, html, render } from 'lit'
import {repeat} from 'lit/directives/repeat.js';

export class ItemPage extends LitElement {

  static properties = {
    loading: { type: Boolean },
    wizard: { type: Object }
  }

  static styles = css `
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
      margin-top: 24px;
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

    .title {
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

    .list {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .list > .row {
      display: grid;
      grid-template-columns: 50% auto;
      gap: 15px;
    }

    .list > .row:first-child {
      margin-top: 28px;
    }

    .list > .row > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .list > .row > div > span {
      font-family: 'Montserrat';
      padding: 8px;
      color: var(--primary-color);
      background: #eee;
    }

    .list > .row > div > input {
      padding: 8px;

    }
  `

  constructor () {
    super ()
    this.loading = true
  }

  firstUpdated () {
    this.wizard.items = []
    this.loading = false
  }

  render () {
    if (this.loading == true) return
    return html `

      <h5 class="title">Insira os items que deseja comparar!</h5>


      <div class="list">
        ${this.__renderItems()}
      </div>


      <span class="text-add" @click=${this.__add}>
        <p>Adicionar Item
          <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </p>
      </span>
    `
  }

  __renderItems () {
    return repeat (this.wizard.items, (item) => item.name, (item, idx) => {
      return html `
        <div class="row">
          <div>
            <span>Nome</span>
            ${this.wizard.criteria.map (criteria => {
              return html `
              <span>${criteria.name}</span>
              `
            })}
          </div>

          <div>
            <input type="text" row="${idx}" column="${0}" type="text" @change=${this.__change}/>
            ${this.wizard.criteria.map ((criteria, column_i) => {
              column_i = column_i + 1
              return html `
                <input .value=${this.wizard.items[idx][column_i]} row="${idx}" column="${column_i}" type="number" @change=${this.__change} />
              `
            })}
          </div>
        </div>
      `
    })
  }

  __add () {
    const tmp = []
    tmp[0] = ''
    this.wizard.criteria.map ((_, idx) => {
      idx = idx + 1
      tmp[idx] = 0
    })

    this.wizard.items.push(tmp)
    this.requestUpdate()
  }

  __change (e) {
    if (!e.currentTarget) return
    const row = Number(e.currentTarget.getAttribute('row'))
    const column = Number(e.currentTarget.getAttribute('column'))

    if (e.currentTarget.type === "text") {
      this.wizard.items[row][column] = e.currentTarget.value
    } else {
      this.wizard.items[row][column] = Number(e.currentTarget.value)
    }

    console.log(this.wizard.items)
  }

  validate () {

    if (this.wizard.items.length < 2) {
      throw 'Insira pelo menos dois items!'
    }

    this.wizard.items.map ((row, row_i) => {
      row.map ((value, column_i) => {

        if (column_i > 0) {
          if (value == 0) {
            throw 'Insira todos os valores necessarios! (0 nao e valido)'
          }

          if (value.toString().length > 1) {
            throw 'Insira um valor entre 1 e 9'
          }

          if (value <= 0 && value > 9) {
            throw 'Insira um valor entre 1 e 9'
          }
        } else {
          if (value === '') {
            throw 'Insira um nome no item !'
          }
        }
      })
    })
  }

  updateState () {
    const tempMatrix = []
    this.wizard.items.map ((_, row_i) => {
      tempMatrix.push([])
      tempMatrix[row_i][0] = this.wizard.items[row_i][0]
      this.wizard.criteria.map ((_, column_i) => {
        column_i = column_i + 1
        if (this.wizard.items[row_i][column_i]) {
          tempMatrix[row_i][column_i] = this.wizard.items[row_i][column_i]
        } else {
          tempMatrix[row_i][column_i] = 0
        }
      })
    })
    this.wizard.items = tempMatrix


    console.log(this.wizard.items)
    this.requestUpdate()
  }
}
window.customElements.define('item-page', ItemPage)
