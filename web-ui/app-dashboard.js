import { LitElement, css, html } from 'lit'

export class AppDashboard extends LitElement {

  static properties = {
    loading: { type: Boolean }
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
  `

  constructor () {
    super ()
    this.loading = true

    if (window.app.sessionData.token == null) {
      window.location.href = '/'; //relative to domain
    }
  }

  async firstUpdated () {
    await this.validate ()

    this._renderMenu()
  }

  render () {
    if (this.loading == true) return

    return html `
      <div class="container">
        <ul class="header">
          <li name="menu" menu="0" @click=${this._changeMenu} class="active">Criterios</li>
          <li name="menu" menu="1" @click=${this._changeMenu}>Custos Criterios</li>
          <li name="menu" menu="2" @click=${this._changeMenu}>Items</li>
        </ul>

        <section id="section">
        </section>

        <div class="bottom-tab">
          <span @click=${() => this.__buttonsChangeMenu(false)} class="button">
            <svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>
          </span>

          <span @click=${this.__buttonsChangeMenu} class="button">
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

  // TODO REVIEW MENUS SYSTEM
  _changeMenu (e, index) {
    if (!e?.currentTarget && !index) return

    let menuIndex = 0
    if (e?.currentTarget) {
      menuIndex = Number(e.currentTarget.getAttribute('menu'))
    } else {
      menuIndex = index
    }


    // CHANGE MENU ACTIVE
    const menusItems = this.shadowRoot.querySelectorAll('li[name="menu"]')
    menusItems.forEach(item => {
      item.classList.remove('active')

      if (menuIndex === Number(item.getAttribute('menu'))) {
        item.classList.add('active')
      }
    })

    this.shadowRoot.getElementById('section').scrollLeft = menuIndex * this.shadowRoot.getElementById('section').offsetWidth
  }

  __buttonsChangeMenu (right = true) {
    let index = 0
    const menusItems = this.shadowRoot.querySelectorAll('li[name="menu"]')

    menusItems.forEach((item, idx) => {

      if (item.classList.contains('active')) {
        index = idx
      }

      item.classList.remove('active')
    })

    if (right) {
      if (menusItems[index + 1]) {
        index = index + 1
      } else {
        index = 0
      }
    } else {
      if (menusItems[index - 1]) {
        index = index - 1
      } else {
        index = menusItems.length - 1
      }
    }
    console.log(index)

    this._changeMenu(null, index)
  }

  _renderMenu () {
    const menus = [
      './algorithm/criteria-form.js',
      './algorithm/criteria-costs-form.js',
      './algorithm/items-form.js'
    ]

    menus.forEach(async menu => {
      import (menu)

      const array = menu.split('/')
      const elementName = array[array.length - 1].replace('.js', '')

      const div = document.createElement('div')
      div.classList.add("container-section_menu")
      const element = document.createElement(elementName)

      div.appendChild(element)
      this.shadowRoot.getElementById('section').appendChild(div)
    })
  }
}
window.customElements.define('app-dashboard', AppDashboard)
