import { LitElement, css, html } from 'lit'

export class AppHeader extends LitElement {

  static styles = css `
    :host {
      width: 100%;
      z-index: 100;
      position: fixed;
    }

    .container {
      display: grid;
      height: 75px;
      grid-template-columns: 50% 50%;
      grid-template-rows: 100%;
      align-items: center;
      padding: 0px;
      margin: 0px;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      padding: 0px 10%;
    }

    @media only screen and (min-width: 2000px) {
      .container {
        padding: 0px 20vw;
      }
    }

    .container.active {
      background: rgba(238, 238, 238, 0.95);
    }

    .hamburger {
      display: none;
      fill: white;
      transition: 100ms all ease-in-out;
    }

    .container.active .hamburger{
      fill: var(--secondary-color);
    }

    .hamburger > svg {
      filter: drop-shadow(3px 3px 1px rgb(0 0 0 / 0.1));
    }

    .hamburger:active {
      transform: scale(0.8);
    }

    @media only screen and (max-width: 820px) {
      .container {
        grid-template-columns: auto 30px;
        grid-gap: 8px;
        padding: 0px 12px;
      }

      .hamburger {
        display: block;
      }
    }

    h2 {
      position: relative;
      font-size: 20px;
      color: white;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0px;
    }

    .container.active h2{
      color: var(--primary-color);
    }

    h2:before {
      content: 'Data Sync Relationships';
    }

    .list {
      display: flex;
      justify-content: end;
      list-style: none;
      padding: 0px;
      margin: 0px;
    }

    @media only screen and (max-width: 820px) {
      h2 {
        font-size: 20px;
      }

      h2:before {
        content: 'DS Relationships';
      }

      .list {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: auto;
        background: var(--primary-color);
        top: 75px;
        right: -100%;
        width: 180px;
        height: auto;
        box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
        justify-content: flex-start;
        padding: 12px;
        border-radius: 0px 0px 0px 5px;
        transition: 300ms all ease-in-out;
      }

      .list.active {
        right: 0px;
      }
    }

    .list > li {
      position: relative;
      margin-left: 18px;
      font-size: 15px;
      color: white;
      letter-spacing: 0px;
      font-weight: bold;
      cursor: pointer;
      transition: 300ms all ease-in-out;
    }

    .container.active li{
      color: var(--primary-color);
    }

    .list > li:hover {
      color: var(--primary-color);
    }

    .container.active li:hover {
      color: var(--secondary-color);
    }

    .list > li::before {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0px;
      width: 0px;
      height: 2px;
      background-color: var(--primary-color);
      transition: 200ms;
    }

    .container.active li:hover::before {
      background-color: var(--secondary-color);
    }

    .list > li:hover::before {
      width: 100%;
    }

    @media only screen and (max-width: 820px) {
      .list > li {
        margin-right: 0px;
        margin-top: 20px;
        color: white;
        font-size: 15px;
      }

      .list > li:first-child {
        margin-top: 0px;
      }

      .container.active li{
        color: white;
      }

      .list > li:hover {
        color: var(--secondary-color);
      }

      .list > li::before {
        background-color: var(--secondary-color);
      }
    }
  `

  constructor() {
    super()
  }

  firstUpdated () {

    window.app.addEventListener('scroll', (e) => {
      this.__headerAction(e)
    })
  }

  render () {
    return html `
      <div id="container" class="container">
        <h2></h2>

        <ul class="list" id="list">
          <li>Sobre Nós</li>
          <li>Produto</li>
          <li>Planos</li>
          <li>Contactos</li>
        </ul>

        <span class="hamburger" @click=${this.__hamburguerAction}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="30px" width="30px" stroke="1" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve"><g><path class="st0" d="M495.957,390.227H16.044C7.185,390.227,0,397.401,0,406.249v26.685c0,54.749,114.619,47.804,256,47.804   s256-2.185,256-47.804v-26.685C512,397.401,504.815,390.227,495.957,390.227z"/><path class="st0" d="M42.934,353.858h426.13c15.913,0,28.794-12.891,28.794-28.794v-25.272c0-15.891-12.881-28.771-28.794-28.771   H430.37l-61.163,61.152c-15.652,15.662-41.033,15.662-56.696,0l-61.152-61.152H42.934c-15.913,0-28.793,12.88-28.793,28.771v25.272   C14.141,340.967,27.022,353.858,42.934,353.858z"/><path class="st0" d="M256,30.977c-141.38,0-256,74.13-256,172.554v20.739c0,8.848,7.185,16.032,16.044,16.032h479.913   c8.858,0,16.043-7.185,16.043-16.032v-20.739C512,105.107,397.38,30.977,256,30.977z M128.706,144.118   c-9.38,0-16.967-7.586-16.967-16.967c0-9.37,7.587-16.978,16.967-16.978c9.37,0,16.978,7.609,16.978,16.978   C145.684,136.532,138.076,144.118,128.706,144.118z M205.076,93.205c-9.37,0-16.967-7.598-16.967-16.967   c0-9.381,7.598-16.967,16.967-16.967c9.38,0,16.978,7.586,16.978,16.967C222.054,85.608,214.456,93.205,205.076,93.205z    M256,161.097c-9.37,0-16.978-7.609-16.978-16.978c0-9.37,7.609-16.967,16.978-16.967c9.37,0,16.978,7.598,16.978,16.967   C272.978,153.488,265.369,161.097,256,161.097z M306.924,93.205c-9.38,0-16.978-7.598-16.978-16.967   c0-9.381,7.598-16.967,16.978-16.967c9.37,0,16.967,7.586,16.967,16.967C323.891,85.608,316.293,93.205,306.924,93.205z    M383.293,144.118c-9.37,0-16.978-7.586-16.978-16.967c0-9.37,7.609-16.978,16.978-16.978c9.381,0,16.967,7.609,16.967,16.978   C400.26,136.532,392.674,144.118,383.293,144.118z"/></g></svg>
        </span>
      </div>
    `
  }

  __hamburguerAction () {
    console.log("click")
    const element = this.shadowRoot.getElementById('list')
    if (element.classList.contains('active')) {
      element.classList.remove('active')
    } else {
      element.classList.add('active')
    }
  }

  __headerAction (e) {
    const currentX = e.currentTarget.scrollTop;
    const heightHeader = this.offsetHeight
    const element = this.shadowRoot.getElementById('container')

    if (currentX > heightHeader) {
      if (!element.classList.contains('active')) {
        element.classList.add('active')
        console.log("ativo")
      }
    } else {
      element.classList.remove('active')
    }

  }
}
window.customElements.define('app-header', AppHeader)
