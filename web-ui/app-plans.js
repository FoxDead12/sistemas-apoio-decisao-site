import { LitElement, css, html } from 'lit'

export class AppPlans extends LitElement {

  static styles = css `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 75px 10%;
    }

    .title {
      font-family: 'Montserrat';
      margin: 0px;
      padding: 0px;
      font-size: 32px;
      text-align: center;
      color: var(--primary-color);
    }

    .sub-title {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      width: 100%;
      text-align: center;
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      margin-top: 16px;
      color: #002c52;
    }

    @media only screen and (max-width: 520px) {
      .sub-title {
        margin: 0px;
        padding: 0px;
        font-family: 'Montserrat';
        width: 100%;
        text-align: left;
        font-weight: normal;
        font-size: 16px;
        line-height: 32px;
        margin-top: 32px;
        letter-spacing: 1px;
        color: #002c52;
      }
    }

    .list-plans {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      margin-top: 65px;
      justify-content: center;
    }

    .plan {
      position: relative;
      width: 300px;
      padding: 32px 32px;
      padding-top: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      border-radius: 10px;
      overflow: hidden;
    }

    @media only screen and (max-width: 450px) {
      .plan {
        width: 100%;
      }
    }

    .plan > .type {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 180px 220px 0 0;
      border-color: #0c2c68 transparent transparent transparent;
    }

    .plan > .type::before {
      content: attr(type);;
      position: absolute;
      left: 14px;
      top: -150px;
      color: white;
      text-transform: uppercase;
      font-size: 24px;
      font-weight: bold;
    }

    .plan > .price {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      font-size: 52px;
      color: var(--primary-color);
      text-align: center;
      font-weight: 600;
    }

    .plan > .price > span {
      font-size: 22px;
    }

    .plan > .price > span > span {
      fon t-size: 16px;
    }

    .plan > .tax {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      font-size: 16px;
      color: #ccc;
      font-weight: 600;
      text-align: center;
      margin-top: 16px;
    }

    .plan > .description {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      font-family: 'Montserrat';
      line-height: 28px;
      letter-spacing: 1px;
      margin-top: 32px;
      color: #0c2c68;
    }

    .plan > .button {
      background: var(--secondary-color);
      padding: 12px 32px;
      border-radius: 50px;
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      text-align: center;
      font-size: 18px;
      margin: 28px auto 0 auto;
      cursor: pointer;
      user-select: none;
      transition: 100ms all ease-in-out;
      box-shadow: 0 2px 20px rgba(50, 40, 85, 0.2);
    }

    .plan > .button:active {
      transform: scale(0.8);
    }
  `

  constructor() {
    super()
  }

  render () {
    return html `
      <h3 class="title">Encontra o plano perfeito para o teu negócio!</h3>
      <p class="sub-title">Comece já a utilizar o programa de faturação e tenha os primeiros 30 dias gratuitos.</p>

      <div class="list-plans">
        <div class="plan">
          <span class="type" type="Starter"></span>
          <span class="price">9 <span>EUR/<span>mês</span></span></span>
          <span class="tax">acresce IVA à taxa legal em vigor</span>
          <p class="description">Fature, acompanhe vendas, controle stocks, registe despesas e arquive-as digitalmente</p>
          <div class="button">Experimentar</div>
        </div>

        <div class="plan">
          <span class="type" type="Plus"></span>
          <span class="price">14 <span>EUR/<span>mês</span></span></span>
          <span class="tax">acresce IVA à taxa legal em vigor</span>
          <p class="description">Fature, acompanhe vendas, controle stocks, registe despesas e arquive-as digitalmente e processe salários</p>
          <div class="button">Experimentar</div>
        </div>

        <div class="plan">
          <span class="type" type="Total"></span>
          <span class="price">16 <span>EUR/<span>mês</span></span></span>
          <span class="tax">acresce IVA à taxa legal em vigor</span>
          <p class="description">Fature, acompanhe vendas e stocks, registe e arquive despesas, processe salários, acompanhe ativos e tenha o seu contabilista a tratar da contabilidade</p>
          <div class="button">Experimentar</div>
        </div>
      </div>
    `
  }
}
window.customElements.define('app-plans', AppPlans)
