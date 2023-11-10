import { LitElement, css, html } from 'lit'

export class CriteriaCostsForm extends LitElement {

  static properties = {
    data: { type: Object },
    costs: { type: Array }
  }

  static styles = css`
    .container {
      max-height: 100%;
      margin: 0px;
      padding: 0px;
      overflow: scroll;
      display: flex;
    }

    table {
      width: 100%;
      overflow: scroll;
      width: 100%;
    }

    th, .column {
      max-width: 150px;
      height: auto;
      padding: 18px 24px;
      margin: 0px;
      font-family: 'Montserrat';
      margin: 0px;
      font-size: 14px;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid #d4d4d4;
      font-weight: normal;
      background: #eee;
      max-width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    td {
      border-bottom: 1px solid #d4d4d4;
      text-align: center;
      color: #333;
      font-size: 16px;
      font-family: 'Montserrat';
    }

    input {
      width: calc(100% - 48px);
      font-family: 'Montserrat';
      display: flex;
      margin: 0px;
      padding: 0px;
      padding: 18px 24px;
      outline:  none;
      border: none;
      text-align: center;
      font-size: 16px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance:textfield;
    }
  `

  constructor () {
    super ()
    this.cost = []
  }

  render () {
    if (!this.data?.criteria) return

    return html `
      ${this.__renderTable()}
    `
  }

  __changeInput (e) {
    const row = Number(e.currentTarget.getAttribute('row'))
    const column = Number(e.currentTarget.getAttribute('column'))

    this.cost[row][column] = Number(e.currentTarget.value)

  }

  __renderColumns (row) {
    if (!this.cost[row]) return

    return this.cost[row].map ((item, idx) => {
      return html `
        <td>
          <input name="cost" column=${idx} row=${row} .value=${item} type="number"/>
        </td>
      `
    })
  }

  __renderHeaders (criteria) {
    return criteria.map (item => {
      return html `
        <th>
          ${item.name}
        </th>
      `
    })
  }

  __renderTable () {
    const criteria = this.data?.criteria
    if (criteria.length == 0) return
    this.cost = []

    criteria.map (item => {
      let array = new Array(criteria.length)
      for (let i = 0; i <= array.length - 1; i++) {
        array[i] = ''
      }
      this.cost.push(array)
    })

    return html `
      <div class="container">
        <table>
          <tr class="header">
            <th></th>
            ${this.__renderHeaders(criteria)}
          </tr>

          ${criteria.map((item, row) => {
            return html `
              <tr>
                <td class="column">${item.name}</td>
                ${this.__renderColumns(row)}
              </tr>
            `
          })}
        </table>
      </div>
    `
  }

  validate () {

  }

  save () {
    const inputs = this.shadowRoot.querySelectorAll('input[name="cost"]')
    inputs.forEach(item => {
      const row = Number(item.getAttribute('row'));
      const column= Number(item.getAttribute('column'));

      this.cost[row][column] = Number(item.value)
    })

    return {cost: this.cost}
  }
}
window.customElements.define('criteria-costs-form', CriteriaCostsForm)
