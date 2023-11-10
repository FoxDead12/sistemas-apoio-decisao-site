import { LitElement, css, html, render } from 'lit'

export class AppDashboard extends LitElement {

  static properties = {
    loading: { type: Boolean },
    data: { type: Object },
    download: { type: Boolean }
  }

  static styles = css `

    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      width: 750px;
      height: 600px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .container > .header {
      background: #eee;
      margin: 0px;
      display: flex;
      list-style: none;
      justify-content: space-evenly;
      background: var(--primary-color);
    }

    .header > li {
      position: relative;
      font-family: 'Montserrat';
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 400;
      color: white;
      padding: 12px;
      cursor: pointer;
    }

    .header > li:hover {
      color: #d4d4d4;
    }

    .header > li::before {
      content: '';
      display: none;
      position: absolute;
      height: 3px;
      width: 100%;
      background: var(--secondary-color);
      bottom: -1.5px;
      left: 0px;
    }

    .header > li.active::before {
      display: block;
    }

    section {
      position: relative;
      display: flex;
      margin: 0px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      scroll-behavior: smooth;
    }

    section > .container-section_menu {
      flex: none;
      width: calc(100% - 24px);
      height: calc(100% - 24px);
      padding: 12px;
    }

    .bottom-tab {
      z-index: 2;
      background: white;
      padding: 12px 16px;
      box-shadow: 0 2px 10px rgba(50, 40, 85, 0.2);
      display: flex;
      justify-content: end;
      gap: 20px;
    }

    .bottom-tab > .button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: var(--primary-color);
      border-radius: 30px;
      padding: 5px;
      color: white;
      box-shadow: 0 2px 2px rgba(50, 40, 85, 0.2);
    }

    .container-success {
      position: absolute;
      background: white;
      width: 100%;
      height: 100%;
      right: 0px;
    }

    .container-success > h5 {
      font-family: 'Montserrat';
      font-size: 32px;
      text-transform: uppercase;
      color: var(--primary-color);
      letter-spacing: 1px;
      text-align: center;
      margin: 0px;
      padding: 32px 0px;
    }

    .container-success > a {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }

    .container-success > a > svg {
      stroke: white;
      background: var(--primary-color);
      border-radius: 50%;
      padding: 12px;
    }


    .container-success > p {
      font-family: 'Montserrat';
      font-size: 16px;
      color: #333;
      text-align: center;
      margin-top: 32px;
    }
  `

  constructor () {
    super ()

    this.loading = true

    this.download = false

    this.indexMenu = 0

    this.data = {}

    if (window.app.sessionData.token == null) {
      window.location.href = '/'; //relative to domain
    }
  }

  async firstUpdated () {
    await this.validate ()

    this._renderMenu()
    this.__setMenu()
  }

  render () {
    if (this.loading == true) return

    return html `
      <div class="container">
        <ul class="header">
          <li name="menu" menu="0" @click=${this.__changeMenu}>Criterios</li>
          <li name="menu" menu="1" @click=${this.__changeMenu}>Custos Criterios</li>
          <li name="menu" menu="2" @click=${this.__changeMenu}>Items</li>
        </ul>

        <section id="section">
          ${this.download == true ? html `
            <div class="container-success">
              <h5>Ficheiro gerado!</h5>
              <a href="${this.url}">
              <svg width="150px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
              </a>

              <p>
              Click no icon acima para baixar o ficheiro que foi gerado!
              </p>
            </div>
          ` : ''}
        </section>

        <div class="bottom-tab">
          <span action="left" @click=${this.__changeMenu} class="button">
            <svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>
          </span>

          <span action="right" @click=${this.__changeMenu} class="button">
            <svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    `
  }

  async validate () {
    try {
      const result = await fetch (window.app.originUrl + '/validate?token=' + window.app.sessionData.token)

      if (result.status !== 200) {
        localStorage.removeItem("token");
        window.app.sessionData = null
        window.history.pushState("", "", "/")
      }

      const data = await result.json()
      window.app.sessionData = {...data, ...window.app.sessionData}

    } catch (e) {
      console.error(e)
    }

    this.loading = false
  }

  __changeMenu (e) {
    try {
      const element = e.currentTarget
      const oldIndex = this.indexMenu
      switch (element.getAttribute('action')) {
        case 'left':
          if (this.indexMenu - 1 >= 0) {
            this.indexMenu -= 1
          }
          break
        case 'right':
          if (this.indexMenu + 1 <= this.maxIndex) {
            this.indexMenu += 1
          }
          break
        default:
          this.indexMenu = Number(element.getAttribute('menu'))
      }

      try {
        const result = this.elementMenus[oldIndex].save()
        this.data = Object.assign({}, this.data, result)
        this.elementMenus[this.indexMenu].data = this.data // UPDATE COMPONENTE ATRIBUTE
      } catch (e) {
        console.log(e)
      }

      this.__setMenu()

      if (oldIndex == 2) {
        this.__validate()

        this.__executeJob()
      }
    } catch (e) {
      console.error(e)
    }
  }

  __setMenu () {
    const menusItems = this.shadowRoot.querySelectorAll('li[name="menu"]')
    menusItems.forEach(item => {
      item.classList.remove('active')

      if (this.indexMenu === Number(item.getAttribute('menu'))) {
        item.classList.add('active')
      }
    })

    this.shadowRoot.getElementById('section').scrollLeft = this.indexMenu * this.shadowRoot.getElementById('section').offsetWidth
  }

  _renderMenu () {
    const menus = [
      './algorithm/criteria-form.js',
      './algorithm/criteria-costs-form.js',
      './algorithm/items-form.js'
    ]

    this.maxIndex = menus.length - 1
    this.elementMenus = []

    import ('./algorithm/criteria-form.js')
    import ('./algorithm/criteria-costs-form.js')
    import ('./algorithm/items-form.js')

    menus.forEach(async menu => {
      const array = menu.split('/')
      const elementName = array[array.length - 1].replace('.js', '')

      const element = document.createElement(elementName)
      element.data = this.data
      this.elementMenus.push(element)


      const div = document.createElement('div')
      div.classList.add("container-section_menu")
      this.shadowRoot.getElementById('section').appendChild(div)
      render(element ,div)

    })
  }

  __validate () {
    if ((this.data.hasOwnProperty('cost') && this.data.hasOwnProperty('items') && this.data.hasOwnProperty('criteria')) == false) {
      throw 'Preencha todos os campos'
    }

    if ((this.data.cost.length <= 0 && this.data.items.length <= 0 && this.data.criteria.length <= 0) == true) {
      throw 'Preencha todos os campos'
    }
  }

  async __executeJob () {

    try {

      const result = await fetch(window.app.originUrl + '/algorithm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.app.sessionData.token}`
        },
        body: JSON.stringify(this.data)
      })

      const file = await result.json()
      const url = window.app.originUrl + '/excel/' + file.file
      this.shadowRoot.getElementById('section').scrollLeft = 0
      this.url = url
      this.download = true
    } catch (e) {
      console.error(e)
    }
  }
}
window.customElements.define('app-dashboard', AppDashboard)
