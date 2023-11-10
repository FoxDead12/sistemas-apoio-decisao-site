import { LitElement, css, html } from 'lit'

export class ItemsForm extends LitElement {

  static properties = {
    data: { type: Object },
    items: { type: Array }
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

  th {
    max-width: 150px;
    min-width: 100px;
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

  .plus-container {
    margin-top: 25px;
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

    this.items = []
  }

  render () {
    if (!this.data?.criteria) return

    return html `
      ${this.__renderTable()}

      <div class="plus-container">
        <div @click=${this.__addItem}>
          <h5>Adicionar Items</h5>
          <svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    `
  }

  __addItem () {

    // if (this.items.length >= this.data.criteria.length) {
    //   return
    // }

    const array = [...this.items]
    const row = []
    row.push('')
    this.data.criteria.map(item => {
      row.push('')
    })
    array.push(row)
    this.items = array
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

  __renderColumns (row) {
    if (!this.items[row]) return

    return this.items[row].map ((item, idx) => {
      return html `
        <td>
          <input name="item" column=${idx} row=${row} .value=${item} .type=${idx == 0 ? 'text' : "number"}/>
        </td>
      `
    })
  }

  __renderTable () {

    const criteria = this.data?.criteria
    if (criteria.length == 0) return
    console.log(this.items)
    return html `
      <div class="container">
        <table>
          <tr class="header">
            <th>Nome</th>
            ${this.__renderHeaders(criteria)}
          </tr>

          ${this.items.map ((item, row_i) => {
            return html `
              <tr>
              ${this.__renderColumns(row_i)}
              </tr>
            `
          })}

          <!-- ${criteria.map((item, row) => { // NEED INVERT THIS FOR EACH
            return html `
              <tr>
                ${this.__renderColumns(row)}
              </tr>
            `
          })} -->

        </table>
      </div>
    `
  }

  save () {
    const inputs = this.shadowRoot.querySelectorAll('input[name="item"]')
    inputs.forEach(item => {
      const row = Number(item.getAttribute('row'));
      const column= Number(item.getAttribute('column'));

      if (item.type === 'text') {
        this.items[row][column] = item.value
      } else {
        this.items[row][column] = Number(item.value)
      }
    })

    return {items: this.items}
  }
}
window.customElements.define('items-form', ItemsForm)
