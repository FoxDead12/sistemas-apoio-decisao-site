import { LitElement, css, html, render } from 'lit'

import './pages/criteria-page.js'
import './pages/cost-page.js'
import './pages/item-page.js'

export class AppForm extends LitElement {
  static properties = {
    wizard: { type: Object },
    currentPage: { type: Int8Array },
    loading: { type: Boolean },
    loadingFetch: { type: Boolean },
    success: { type: Boolean }
  }

  static styles = css `
    .container {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #d4d4d4;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .form {
      position: relative;
      background: white;
      width: 780px;
      height: 550px;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      overflow: hidden;
      border-radius: 5px;
      display: grid;
      grid-auto-rows: auto 1fr 55px;
    }

    .header {
      display: flex;
      list-style: none;
      justify-content: space-evenly;
      margin: 0px;
      padding: 12px;
      background: var(--primary-color);
      box-shadow: 0 2px 5px rgba(50, 40, 85, 0.2);
    }

    @media only screen and (max-width: 800px) {
      .form {
        width: 90%;
      }

      .header {
        justify-content: space-between;
      }
    }

    .header > li {
      font-family: 'Montserrat';
      font-size: 18px;
      color: white;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: normal;
    }

    .pages-container {
      display: flex;
      overflow: hidden;
      scroll-behavior: smooth;
    }

    .buttons-container {
      box-shadow: 0 0px 10px rgba(50, 40, 85, 0.2);
      display: flex;
      align-items: center;
      justify-content: right;
      padding: 0px 15px;
      gap: 12px;
      z-index: 1;
    }

    .button {
      padding: 12px;
      background: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50px;
      cursor: pointer;
      transition: 100ms all ease-in-out;
      color: white;
      font-family: 'Montserrat';
      font-size: 18px;
      letter-spacing: 1.5px;
      font-weight: normal;
      user-select: none;
    }

    .button > svg {
      stroke: white;
      transform: scale(1.3);
    }

    .button:active {
      transform: scale(0.9);
    }

    .page-container_item {
      flex: none;
      width: calc(100% - 24px);
      height: calc(100% - 24px);
      padding: 12px;
      overflow: auto;
    }

    .toast {
      width: calc(100% - 48px - 4px);
      position: absolute;
      background: #f1aeb5;
      color: #6c272d;
      border: 2px solid #f1aeb5;
      bottom: 70px;
      left: 0px;
      padding: 4px 12px;
      margin: 0px 12px;
      border-radius: 4px;
      font-family: 'Montserrat';
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0.5px;
      -webkit-animation: slide-top 300ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      animation: slide-top 300ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @-webkit-keyframes slide-top {
      0% {
        -webkit-transform: translateY(100px);
                transform: translateY(100px);
                opacity: 0;
      }
      80% {
                opacity: 1;
      }

      100% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
      }
    }
    @keyframes slide-top {
      0% {
        -webkit-transform: translateY(100px);
                transform: translateY(100px);
                opacity: 0;
      }
      80% {
                opacity: 1;
      }
      100% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
      }
    }

    .loader {
      z-index: 5;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0, 0.4);

      display: none;
      justify-content: center;
      align-items: center;
    }

    .loader.active {
      display: flex;
    }

    .lds-roller {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-roller div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 40px 40px;
    }
    .lds-roller div:after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      margin: -4px 0 0 -4px;
    }
    .lds-roller div:nth-child(1) {
      animation-delay: -0.036s;
    }
    .lds-roller div:nth-child(1):after {
      top: 63px;
      left: 63px;
    }
    .lds-roller div:nth-child(2) {
      animation-delay: -0.072s;
    }
    .lds-roller div:nth-child(2):after {
      top: 68px;
      left: 56px;
    }
    .lds-roller div:nth-child(3) {
      animation-delay: -0.108s;
    }
    .lds-roller div:nth-child(3):after {
      top: 71px;
      left: 48px;
    }
    .lds-roller div:nth-child(4) {
      animation-delay: -0.144s;
    }
    .lds-roller div:nth-child(4):after {
      top: 72px;
      left: 40px;
    }
    .lds-roller div:nth-child(5) {
      animation-delay: -0.18s;
    }
    .lds-roller div:nth-child(5):after {
      top: 71px;
      left: 32px;
    }
    .lds-roller div:nth-child(6) {
      animation-delay: -0.216s;
    }
    .lds-roller div:nth-child(6):after {
      top: 68px;
      left: 24px;
    }
    .lds-roller div:nth-child(7) {
      animation-delay: -0.252s;
    }
    .lds-roller div:nth-child(7):after {
      top: 63px;
      left: 17px;
    }
    .lds-roller div:nth-child(8) {
      animation-delay: -0.288s;
    }
    .lds-roller div:nth-child(8):after {
      top: 56px;
      left: 12px;
    }
    @keyframes lds-roller {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .success-container {
      position: absolute;
      background: white;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 3;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .success-container > h5 {
      font-family: 'Montserrat';
      margin: 0px;
      padding: 0px;
      font-size: 32px;
      color: var(--primary-color);
      margin-bottom: 32px;
    }

    .success-container svg {
      background: var(--primary-color);
      stroke: white;
      border-radius: 150px;
      padding: 12px;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
    }

    .success-container > p {
      margin-top: 32px;
      font-family: 'Montserrat';
      font-size: 16px;
      text-align: center;
    }

    .success-container > p > span {
      font-size: 12px;
      font-style: italic;
    }

    .info {
      z-index: 1;
      overflow: hidden;
      background: white;
      border-radius: 5px;
      position: absolute;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.3);
      position: absolute;
      width: 250px;
      height: 0px;
      left: 0px;
      bottom: 55px;
      transition: 200ms all ease-in-out;
    }

    .info.active {
      height: 250px;
    }

    .info > h5 {
      font-family: 'Montserrat';
      margin: 0px;
      background: var(--primary-color);
      color: white;
      padding: 12px;
      font-size: 18px;
      font-weight: normal;
    }

    .info > p {
      padding: 24px 12px;
      margin: 0px;
      font-family: 'Montserrat';
      color: #333;
      font-size: 16px;
      border-bottom: 1px solid #eee;
    }

    .info > ul {
      list-style: none;
      padding: 0px 12px;
      margin: 0px 0px;
    }

    .info > ul > li {
      font-family: 'Montserrat';
      color: #333;
      margin: 24px 0px;
    }

    .info-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--primary-color);
      border-radius: 50%;
      left: 12px;
      position: absolute;
    }

    .info-button > svg {
      stroke: white;
    }

    @media only screen and (max-width: 800px) {
      .success-container > h5 {
        font-size: 28px;
        text-align: center;
      }

      .success-container > p {
        text-align: left;
        padding: 12px;
      }

      .success-container > p > span {
        font-size: 11px;
        font-style: italic;
      }
    }
  `

  constructor () {
    super ()

    if (window.app.sessionData.token == null) {
      window.location.href = '/'; //relative to domain
    }

    this.wizard = {}
    this.loading = true
    this.loadingFetch = false;

    this.currentPage = 0
    this.pages = [
      'criteria-page',
      'cost-page',
      'item-page'
    ]
  }

  async firstUpdated () {
    await this.validateToken ()

    this.pagesContainer = this.shadowRoot.getElementById('section')
    this.rightButton = this.shadowRoot.getElementById('right')
    this.__renderPage()
  }

  render () {
    if (this.loading == true) return
    return html `
      <section class="container">

        <div class="loader ${this.loadingFetch == true ? 'active' : ''}" id="loader">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        <div class="form" id="form">
          <ul class="header">
            <li>Criterios</li>
            <li>Custos</li>
            <li>Items</li>
          </ul>

          <div class="pages-container" id="section">
          </div>

          <div class="buttons-container">
            <span class="info-button" @mouseleave=${() => this.shadowRoot.getElementById('hover').classList.remove('active')} @mouseenter=${() => this.shadowRoot.getElementById('hover').classList.add('active')}>
              <div class="info" id="hover">
                <h5>Importante saber:</h5>
                <p>Os valores que deve inserir são entre 1 e 9</p>
                <ul>
                  <li>1 - Menos Relevante / Pior</li>
                  <li>9 - Relevante / Melhor</li>
                </ul>
              </div>
              <svg width="44" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            </span>

            <span @click=${this.__leftClick} class="button">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            </span>

            <span id="right" @click=${this.__rightClick} class="button">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </section>
    `
  }

  // ------------------------ //
  //     PRIVATE METHODS      //
  // ------------------------ //

  async validateToken () {
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
      localStorage.removeItem("token");
      window.app.sessionData = null
      window.history.pushState("", "", "/")
      console.error(e)
    }
    this.loading = false
  }

  __renderPage () {
    // LOAD COMPONENTE
    const component = this.pages[this.currentPage]
    const pageElement = document.createElement(component)
    pageElement.wizard = this.wizard

    const container = document.createElement('div')
    container.classList.add('page-container_item')
    container.appendChild(pageElement)
    this.pagesContainer.appendChild(container)

    return pageElement
  }

  __leftClick (e) {
    const nextIndex = this.currentPage - 1
    if (nextIndex < 0) return
    this.currentPage = nextIndex
    this.pagesContainer.scrollLeft = this.currentPage * this.pagesContainer.offsetWidth
    this.__buttonToMove()
  }

  __rightClick (e) {
    try {
      this.__validatePage()

      if (e.currentTarget.getAttribute('mode')) {
        this.__executeJob()
      } else {
        const nextIndex = this.currentPage + 1
        if (nextIndex >= this.pages.length) return // BLOCK
        this.currentPage = nextIndex

        if (this.pagesContainer.children.length <= nextIndex) {
          this.__renderPage()
        }else {
          const div = this.pagesContainer.children[this.currentPage]
          const page = div.children[0]
          page.updateState()
        }

        this.pagesContainer.scrollLeft = this.currentPage * this.pagesContainer.offsetWidth

        if (nextIndex + 1 >= this.pages.length) {
          this.__buttonToSave()
        } else {
          this.__buttonToMove()
        }

      }
    } catch (e) {
      console.error(e)
      this.__enableToast(e)
    }
  }

  __buttonToSave () {
    this.rightButton.setAttribute('mode', true)
    this.rightButton.innerHTML = 'Gravar'
  }

  __buttonToMove () {
    this.rightButton.removeAttribute('mode')
    this.rightButton.innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>`
  }

  __validatePage () {
    const div = this.pagesContainer.children[this.currentPage]
    const page = div.children[0]
    page.validate()
  }

  __enableToast (error) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    div.classList.add('toast')
    p.innerText = error
    div.appendChild(p)
    this.shadowRoot.getElementById('form').appendChild(div)

    setTimeout (() => {
      this.shadowRoot.getElementById('form').removeChild(div);
    }, 1000)
  }

  async __executeJob () {
    this.loadingFetch = true;
    try {

      const result = await fetch(window.app.originUrl + '/algorithm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.app.sessionData.token}`
        },
        body: JSON.stringify(this.wizard)
      })

      if (result.status !== 200) {
        const data = await result.json()
        throw data.message
      }

      const file = await result.json()
      const url = `${window.app.originUrl}/excel?name=${file.file}&token=${window.app.sessionData.token}`

      const successElement = `<div class="success-container"><h5>Ficheiro gerado com sucesso!</h5><a href="${url}" target="_blank"><svg width="150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg></a><p>Clique no icon acima para baixar o ficheiro gerado! <br><span>(caso necessite de fazer outro pedido renicie a pagina)</span></p></div>`
      this.shadowRoot.getElementById('form').innerHTML = successElement
    } catch (e) {
      console.error(e)
      this.__enableToast(e)
    }

    this.loadingFetch = false;
  }
}
window.customElements.define('app-form', AppForm)
