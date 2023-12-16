import { LitElement, css, html, render } from 'lit'
import {repeat} from 'lit/directives/repeat.js';

export class ItemPage extends LitElement {

  static properties = {
    loading: { type: Boolean },
    wizard: { type: Object },
    dataDB: { type: Object }
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
      width: 150px;
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

    .title > span {
      color: #333;
      font-size: 12px;
      font-style: italic;
      font-weight: normal;
      text-align: center;
      text-transform: lowercase;
      margin-top: 8px;
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
      gap: 12px;
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

    .row  input {
      font-family: 'Montserrat';
      font-size: 16px;
      border: 0px;
      padding: 0px;
      outline: none;
      border-bottom: 1px solid #d4d4d4;
      padding-bottom: 4px;
    }

    .list > .row > div > .trash {
      color: #d4d4d4;
      cursor: pointer;
      transition: 100ms all ease-in-out;
      user-select: none;
      background: none;
      color: #333;
      padding: 4px 0px;
      margin: auto;
      margin-left: 0px;
    }

    .list > .row > div > .trash > svg {
      transform: scale(1.2);
      stroke: #333;
    }

    .list > .row > div > .trash:hover svg {
      stroke: #F25757;
    }

    @media only screen and (max-width: 800px) {
      .title {
        font-size: 14px;
      }

      .title > span {
        font-size: 12px;
        margin-top: 12px;
      }

      .list > .row > div > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .list > .row {
        display: grid;
        grid-template-columns: auto 50%;
        gap: 15px;
      }

      .row > input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
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
      <h5 class="title">Insira os items que deseja comparar!<br>
        <span>(Caso de duvida sobre os valores a inserir veja o botao de ajuda!)</span>
      </h5>


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

    if (this.dataDB) {
      let parks_data = []

      this.dataDB.parks_params.map (item => {
        const id = item.id - 1

        if (!parks_data[id]) {
          parks_data[id] = []
          parks_data[id].push(item.park)
        }

        parks_data[id].push(Number(item.value))
      })

      this.wizard.items = parks_data
    }

    return repeat (this.wizard.items, (item,idx) => idx, (item, idx) => {
      return html `
        <div class="row">
          <div>
            <span>Nome</span>
            ${this.wizard.criteria.map ((criteria) => {
              return html `
              <span>${criteria.name}</span>
              `
            })}
            <span>Apagar</span>
          </div>

          <div>
            <input placeholder="Ex: Parque Tecnologico..." type="text" row="${idx}" .value=${this.wizard.items[idx][0]} column="${0}" type="text" @change=${this.__change}/>
            ${this.wizard.criteria.map ((criteria, column_i) => {
              column_i = column_i + 1

              return html `
                <input .value=${this.wizard.items[idx][column_i]} row="${idx}" column="${column_i}" type="number" @change=${this.__change} />
              `
            })}
            <span @click=${this.__remove} index="${idx}" class="trash"><svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></span>
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

  __remove (e) {
    if (!e.currentTarget) return
    const index = Number(e.currentTarget.getAttribute('index'))
    this.wizard.items = this.wizard.items.filter((_, idx) => index != idx)
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

    this.requestUpdate()
  }
}
window.customElements.define('item-page', ItemPage)
