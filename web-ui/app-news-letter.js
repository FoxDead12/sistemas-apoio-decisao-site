import { LitElement, css, html } from 'lit'

export class AppNewsLetter extends LitElement {

  static styles = css `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 32px 10%;
      background: #ff5c35;

      justify-content: center;
      align-items: center;
    }

    h5 {
      margin: 0px;
      font-size: 24px;
      color: white;
      margin-bottom: 24px;
    }

    .container {
      display: flex;
      flex-direction: column;
      width: 600px;
    }

    @media only screen and (max-width: 820px) {
      .container {
        width: 100%;
      }
    }

    .input-container {
      background: white;
      display: grid;
      grid-template-columns: auto 120px;
      border-radius: 50px;
      overflow: hidden;
    }

    .input-container > input {
      font-family: 'Montserrat';
      width: auto;
      height: 50px;
      outline: none;
      border: none;
      background: none;
      color: #0c2c68;
      padding-left: 32px;
      font-size: 16px;
      font-weight: bold;
    }

    @media only screen and (max-width: 820px) {
      .input-container > input {
        font-size: 14px;
        padding-left: 20px;

      }
    }


    .input-container > input::placeholder {
      color: #0c2c68;
    }

    .input-container > span {
      font-family: 'Montserrat';
      font-weight: bold;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      background: #ccc;
      border-radius: 50px;
      justify-content: center;
      color: white;
      box-shadow: rgba(0, 0, 5, 0.3) 0px 3px 5px;
      cursor: pointer;
    }

  `

  constructor () {
    super ()
  }

  render () {
    return html `
      <h5>Subscreva a newsletter e acompanhe as novidades</h5>

      <div class="container">
        <div class="input-container">
          <input type="email" placeholder="Escreva aqui o seu e-mail"/>
          <span>Inscreva-se</span>
        </div>
      </div>
    `
  }
}
window.customElements.define('app-news-letter', AppNewsLetter)
