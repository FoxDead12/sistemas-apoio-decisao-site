import { LitElement, css, html, render } from 'lit'
import {repeat} from 'lit/directives/repeat.js';

export class CostPage extends LitElement {

  static properties = {
    loading: { type: Boolean },
    wizard: { type: Object }
  }

  static styles = css `

    .container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .row {
      display: grid;
      grid-template-columns: 35% 35% auto;
      gap: 10px;
    }

    .row > span {
      font-family: 'Montserrat';
      padding: 8px;
      color: var(--primary-color);
      background: #eee;
    }
  `

  constructor () {
    super ()

    this.loading = true
  }

  firstUpdated () {

    this.wizard.cost = []
    this.__loadCost ()
    this.loading = false
  }

  render () {
    if (this.loading == true) return
    return html `
      <div class="container">
        ${this.__loadQuestions()}
      </div>
    `
  }

  __loadCost () {
    // GENERATE COST MATRIX

    if (this.wizard.criteria.length < this.wizard.cost.length) {
      const tempMatrix = []
      this.wizard.criteria.map ((_, row_i) => {
        tempMatrix.push([])
        this.wizard.criteria.map ((_, column_i) => {
          tempMatrix[row_i][column_i] = this.wizard.cost[row_i][column_i]
        })
      })

      this.wizard.cost = tempMatrix
    }

    this.wizard.criteria.map ((_, row_i) => {
      if (!this.wizard.cost[row_i]) {
        this.wizard.cost.push([])
      }
      this.wizard.criteria.map ((_, column_i) => {
        if (row_i === column_i) {
          this.wizard.cost[row_i][column_i] = 1
        } else {
          if (!this.wizard.cost[row_i][column_i]) {
            this.wizard.cost[row_i][column_i] = 0
          }
        }
      })
    })
  }

  __loadQuestions () {
    const tempMatrix = []
    this.wizard.criteria.map ((_, row_i) => {
      this.wizard.criteria.map ((_, column_i) => {
        if (row_i !== column_i) {
          let id = `${row_i}-${column_i}`
          let iid = `${column_i}-${row_i}`

          if (!tempMatrix.find(some => some == id)) {
            if (!tempMatrix.find(some => some == iid)) {
              tempMatrix.push(id)
            }
          }
        }
      })
    })

    return repeat(tempMatrix, (item) => item, (item) => {
      const [row, column] = item.split('-')
      return html `
      <div class="row">
        <span>${this.wizard.criteria[row].name}</span>
        <span>${this.wizard.criteria[column].name}</span>
        <input maxLength="1" type="number" @change=${this.__change} .value=${this.wizard.cost[row][column]} row="${row}" column="${column}" />
      </div>
    `
    })
  }

  __change (e) {
    if (!e.currentTarget) return
    const row = Number(e.currentTarget.getAttribute('row'))
    const column = Number(e.currentTarget.getAttribute('column'))
    this.wizard.cost[row][column] = Number(e.currentTarget.value)
    this.wizard.cost[column][row] = parseFloat((1 / Number(e.currentTarget.value)).toFixed(2));
  }

  validate () {
    this.wizard.cost.map ((row, row_i) => {
      row.map ((value, column_i) => {
        if (value == 0) {
          throw 'Insira todos os valores necessarios! (0 nao e valido)'
        }

        if (column_i > row_i) {
          if (value.toString().length > 1) {
            throw 'Insira um valor entre 1 e 9'
          }

          if (value <= 0 && value > 9) {
            throw 'Insira um valor entre 1 e 9'
          }
        }
      })
    })
  }

  updateState () {
    this.__loadCost()
    this.requestUpdate()
  }
}
window.customElements.define('cost-page', CostPage)
