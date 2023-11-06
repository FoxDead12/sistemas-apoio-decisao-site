import { LitElement, css, html } from 'lit'

export class AppProduct extends LitElement {

  static properties = {
    itemsMax: { type: Int8Array },
  }

  static styles = css `
  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 75px 10%;
    background: white;
  }

  @media only screen and (min-width: 2000px) {
    :host {
      padding: 75px 20vw;
      padding-top: 75px;
    }
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

  .list-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 64px;
  }

  .list-buttons > div {
    display: flex;
    gap: 32px;

  }

  .button {
    width: 40px;
    height: 40px;
    background-color: #0c2c68;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: rgba(0, 0, 5, 0.3) 0px 3px 5px;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms transform ease-in-out;
    user-select: none;
  }

  .button > svg {
    pointer-events: none;
  }

  .button:active {
    transform: scale(0.8)
  }

  .list-cards {
    position: relative;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-top: 24px;
  }

  .card {
    position: relative;
    width: 500px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
    border-radius: 10px;
  }

  .card.hidden {
    display: none;
  }

  @-webkit-keyframes slide-left {
    0% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(-400px);
              transform: translateX(-400px);
              opacity: 0;
    }
  }


  @-webkit-keyframes slide-right {
    0% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(400px);
              transform: translateX(400px);
              opacity: 0;
    }
  }


  .card > img {
    background: #eee;
    border-radius: 5px;
    width: 100%;
  }

  .card h4 {
    margin: 0px;
    padding: 0px;
    font-family: 'Montserrat';
    font-size: 24px;
    color: var(--primary-color);
    text-align: left;
    margin-top: 40px;
    font-weight: 800;
  }

  @media only screen and (max-width: 850px) {
    .card {
      width: 100%;
    }

    .card > img {
      width: 100%;
      height: 100%;
    }
  }

  .card p {
    font-family: 'Montserrat';
    margin: 0px;
    padding: 0px;
    margin-top: 14px;
    font-size: 14px;
    letter-space: 1px;
    line-height: 28px;
  }
  `

  constructor () {
    super ()

    this.functionalitiesItems = [
      {
        title: 'Gestão com o Cliente',
        description: 'Recursos robustos para acompanhar e manter informações detalhadas sobre os clientes, histórico de interações, preferências e necessidades. Isso ajuda as empresas a melhorar o atendimento ao cliente e a personalização das ofertas.',
        img: 'svgs/methods/cliente_relationship.svg'
      },
      {
        title: 'Faturação e Gestão Financeira',
        description: 'Permite que as empresas emitam faturas profissionais, gerenciem contas a receber e a pagar, e monitorem seu fluxo de caixa. Os relatórios financeiros detalhados fornecem insights importantes para tomar decisões estratégicas.',
        img: 'svgs/methods/faturation_managment.svg'
      },
      {
        title: 'Registro Automático de Despesas',
        description: 'Simplifica o processo de registro de despesas. Ele permite que os funcionários registrem despesas facilmente através de um aplicativo móvel, que pode capturar recibos e categorizar automaticamente as despesas.',
        img: 'svgs/methods/invoice_regist.svg'
      },
      {
        title: 'Realização de Pagamentos',
        description: 'Módulo de pagamento que permite que as empresas paguem fornecedores diretamente do sistema, com a capacidade de programar pagamentos recorrentes e aprovações hierárquicas.',
        img: 'svgs/methods/tax_payments.svg'
      },
      {
        title: 'Arquivo Digital de Documentos',
        description: 'Oferece um repositório digital seguro para armazenar todos os documentos relacionados a transações financeiras, faturas, contratos, entre outros. Isso facilita a busca e recuperação de informações importantes de forma rápida e segura.',
        img: 'svgs/methods/digital_storage.svg'
      },
      {
        title: 'Relatórios e Análises Avançados',
        description: 'Os recursos de geração de relatórios personalizados e análises avançadas fornecem às empresas insights profundos sobre seu desempenho financeiro e relacionamento com o cliente, auxiliando na tomada de decisões estratégicas.',
        img: 'svgs/methods/reports.svg'
      },
      {
        title: 'Segurança e Conformidade',
        description: 'Prioriza a segurança dos dados, seguindo os mais altos padrões de criptografia e garantindo a conformidade com regulamentações de privacidade de dados.',
        img: 'svgs/methods/security.svg'
      },
      {
        title: 'Integração com Bancos e Contabilidade',
        description: 'Integração com instituições bancárias e software de contabilidade, automatizando a reconciliação bancária e simplificando a contabilidade fiscal.',
        img: 'svgs/methods/integration.svg'
      },
    ]

    this.itemsMax = 2
    this.currentLeft = 0
    this.currentRight = this.itemsMax
  }

  firstUpdated () {
    this.__resizeList()

    window.addEventListener('resize', (e) => {
      this.__resizeList (e)
    });
  }

  render () {
    return html `
      <h3 class="title">Explora o CRM ProFinance</h3>
      <p class="sub-title">O <strong>CRM ProFinance</strong> é uma solução abrangente que <strong>unifica ferramentas de gestão de relacionamento com o cliente e recursos financeiros em um único software</strong>, proporcionando às empresas uma plataforma altamente eficiente para a gestão integrada de suas operações.</p>

      <div class="list-buttons">

        <div>
          <div class="button" @click=${this.__scrollToLeft}><svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></div>
          <div class="button" @click=${this.__scrollToRight}><svg style="margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></div>
        </div>
      </div>
      <div id="list" class="list-cards">
        ${this.functionalitiesItems.map((item, idx) => {

          let visibility = false
          if (idx >= this.currentLeft && idx <= this.currentRight) {
            visibility = true
          }

          return html `
          <div class="card ${visibility === false ? 'hidden' : ''}" index="${idx}" id="card_${idx}">
            <img src="${item.img}" width="450" height="450"/>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
          `
        })}
      </div>
    `
  }

  __scrollToLeft () {
    if (this.currentLeft == 0) return

    const elementToHide = this.shadowRoot.getElementById('card_' + this.currentRight)
    elementToHide.style.animation = "slide-right 400ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    elementToHide.style.position = "absolute"
    elementToHide.style.right = 0
    setTimeout(() => {
      elementToHide.classList.add('hidden')
      elementToHide.style.removeProperty('position')
      elementToHide.style.removeProperty('animation')
      elementToHide.style.removeProperty('right')
    }, 200)

    this.currentLeft--
    this.currentRight--
    const elementToShow = this.shadowRoot.getElementById('card_' + this.currentLeft)
    elementToShow.classList.remove('hidden')
  }

  __scrollToRight () {

    if (this.currentRight == this.functionalitiesItems.length - 1) return

    const elementToHide = this.shadowRoot.getElementById('card_' + this.currentLeft)
    elementToHide.style.animation = "slide-left 400ms cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    elementToHide.style.position = "absolute"
    setTimeout(() => {
      elementToHide.classList.add('hidden')
      elementToHide.style.removeProperty('position')
      elementToHide.style.removeProperty('animation')
      elementToHide.style.removeProperty('position')
      elementToHide.style.removeProperty('animation')
      elementToHide.style.removeProperty('right')
    }, 200)

    this.currentLeft++
    this.currentRight++
    const elementToShow = this.shadowRoot.getElementById('card_' + this.currentRight)
    elementToShow.classList.remove('hidden')
  }

  __resizeList (e) {
    this.itemsMax = 2

    if (window.innerWidth >= 2800) {
      this.itemsMax = 3
    }

    if (window.innerWidth <= 1350) {
      this.itemsMax = 1
    }

    if (window.innerWidth <= 850) {
      this.itemsMax = 0
    }

    this.currentLeft = 0
    this.currentRight = this.itemsMax
  }
}
window.customElements.define('app-product', AppProduct)
