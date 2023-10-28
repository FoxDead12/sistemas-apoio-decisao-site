import { LitElement, css, html } from 'lit'

export class AppHero extends LitElement {

  static styles = css `
    .container {
      position: relative;
      height: 100%;
    }


    img {
      position: relative;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      filter: brightness(0.8);
    }

    .content {
      position: absolute;
      bottom: 20vh;
      left: 10%;
      width: 1000px;
    }

    @media only screen and (min-width: 2000px) {
      .content {
        left: 20vw;
      }
    }

    .content > h1 {
      font-family: 'Montserrat';
      font-size: 80px;
      font-weight: bolder;
      color: white;
      margin: 0px;
      padding: 0px;
    }

    .content > h2 {
      font-family: 'Montserrat';
      font-size: 24px;
      font-weight: normal;
      color: white;
      margin: 0px;
      padding: 0px;
      margin-top: 24px;
      line-height: 34px;
    }

    @media only screen and (max-width: 1150px) {

      .content {
        left: 0%;
        width: auto;
        padding: 0px 10%;
      }

      .content > h1 {
        font-size: 60px;
      }

      .content > h2 {
      font-size: 20px;
      margin-top: 20px;
      line-height: 30px;
      }
    }

    @media only screen and (max-width: 820px) {
      .content {
        left: 0%;
        width: auto;
        padding: 0px 5%;
      }

      .content > h1 {
        font-size: 40px;
      }

      .content > h2 {
        font-size: 16px;
        margin-top: 20px;
        line-height: 30px;
      }
    }

    @media only screen and (max-width: 470px) and (max-height: 680px) {
      .content {
        bottom: 5vh;
      }
    }

    .buttons-container {
      display: flex;
      gap: 24px;
      margin-top: 48px;
    }

    .button {
      background: white;
      padding: 28px 64px;
      border-radius: 50px;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      transition: 100ms all ease-in-out;
    }

    @media only screen and (max-width: 1150px) {
      .button {
        padding: 28px 32px;
        border-radius: 50px;
        font-size: 20px;
      }
    }

    @media only screen and (max-width: 710px) {
      .buttons-container {
        flex-direction: column;
        gap: 24px;
      }

      .button {
        text-align: center;
        font-size: 18px;
      }
    }

    .button.primary {
      background-color: var(--primary-color);
      color: white;
    }


    .button.secondary {
      color: var(--secondary-color);
    }

    .button:active {
      transform: scale(0.8)
    }
  `

  constructor () {
    super ()
  }

  render () {
    return html `
      <div class="container">
        <img src="images/foto_1.jpeg" width="100" height="100"/>


        <div class="content">
          <h1>Bem-vindo a Data Sync Relationships_!</h1>
          <h2>O programa de Faturação e Gestão para empresas, com registo automático de despesas, realização de pagamentos e arquivo digital. </h2>

          <div class="buttons-container">
            <div class="button primary">Vem nos conhecer</div>
            <div class="button secondary">Ver Planos</div>
          </div>

        </div>
      </div>
    `
  }
}
window.customElements.define('app-hero', AppHero)
