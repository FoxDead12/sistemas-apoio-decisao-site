import { LitElement, css, html } from 'lit'

export class AppAbout extends LitElement {

  static styles = css `

    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 75px 10%;
    }

    @media only screen and (min-width: 2000px) {
      :host {
        padding: 75px 20vw;
      }
    }

    .title {
      font-family: 'Montserrat';
      margin: 0px;
      padding: 0px;
      font-size: 26px;
      text-align: center;
    }

    .sub-title {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      width: 100%;
      text-align: center;
      font-weight: normal;
      font-size: 16px;
      margin-top: 16px;
      color: #002c52;
    }

    .row {
      display: grid;
      grid-template-columns: 50% 50%;
      margin-top: 64px;
      align-items: flex-start;
      justify-items: center;
    }

    .row:last-child {
      border-top: 1px solid #d4d4d4;
      padding-top: 64px;
    }

    .row > img {
      filter: drop-shadow(2px 2px 5px #d4d4d4);
    }

    .row > .custom-position {
      position: relative;
      top: -50px;
    }

    .row > p {
      margin: 0px;
      padding: 0px;
      font-size: 20px;
      font-family: 'Montserrat';
      line-height: 40px;
      letter-spacing: 1px;
      color: #002c52;
    }

    @media only screen and (max-width: 1370px) {
      .row > img {
        weight: 350px;
        height: 350px;
      }

      .row > img:last-child {
        weight: 500px;
        height: 500px;
      }

      .row > p {
        font-size: 18px;
        line-height: 36px;
        letter-spacing: 1px;
      }
    }

    @media only screen and (max-width: 1120px) {
      .row {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 350px auto;
        margin-top: 64px;
        align-items: flex-start;
        justify-items: center;
        grid-gap: 32px;
      }

      .row:last-child {
        grid-template-rows: auto 500px;
      }
    }

    @media only screen and (max-width: 820px) {


      .row {
        margin-top: 32px;
      }

      .row:last-child {
        padding-top: 32px;
      }

      .row > img {
        width: 90%;
      }

      .row > p {
        font-size: 16px;
        line-height: 32px;
        letter-spacing: 1px;
      }
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

    .row > p > strong {
      color: var(--secondary-color);
    }
  `

  constructor () {
    super ()
  }

  render () {
    return html `
      <h3 class="title">Fica a conhecer Data Sync Relationships</h3>
      <p class="sub-title"><strong>Empresa de CRM para ajudar as empresas na sua gestão</strong>, tanto de RH, faturação, pagamentos e muito mais.</p>


      <div class="row">
        <img src="svgs/desktop computer-bro.svg" width="450" height="450" />
        <p>A <strong>Data Sync Relationships</strong> é uma empresa inovadora que se dedica ao mundo do <strong>Customer Relationship Management (CRM)</strong>, oferecendo soluções e serviços de ponta para empresas que desejam aprimorar suas relações com os clientes e impulsionar o sucesso nos negócios. Com uma visão centrada no cliente, a Data Sync Relationships se destaca no mercado de CRM por sua abordagem personalizada e compromisso inabalável em ajudar as empresas a atingirem seus objetivos.</p>
      </div>


      <div class="row">
        <p>O foco da Data Sync Relationships <strong>vai além de simplesmente fornecer tecnologia</strong>, eles também se concentram em <strong>treinamento e capacitação</strong>. A equipe de especialistas da empresa não apenas implementa sistemas de CRM, mas também treina os funcionários da organização para aproveitar ao máximo as ferramentas disponíveis. Isso garante que as equipes estejam bem preparadas para otimizar a gestão de relacionamento com o cliente, melhorar a eficiência operacional e, consequentemente, aumentar a satisfação do cliente.</p>
        <img src="svgs/Visual data-pana.svg" width="600" height="600" class="custom-position" />
      </div>
    `
  }
}
window.customElements.define('app-about', AppAbout)
