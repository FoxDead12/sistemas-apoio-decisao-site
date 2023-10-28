import { LitElement, css, html } from 'lit'

export class AppContact extends LitElement {

  static styles = css `
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 64px 10%;
      background: #071929;

      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      gap: 40px;
    }

    @media only screen and (min-width: 2000px) {
      :host {
        padding: 64px 20vw;
      }
    }

    .list {
      width: auto;
      display: flex;
      flex-direction: column;
    }

    .list:first-child {
      width: 400px;
    }

    .list > h5 {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      font-size: 18px;
      color: white;
      font-weight: bold;
      margin-bottom: 14px;
      letter-spacing: 1px;
      padding-bottom: 5px;
      border-bottom: 2px solid var(--secondary-color);
    }

    .list > p {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      font-size: 14px;
      line-height: 28px;
      color: white;
    }

    .list > span {
      margin: 0px;
      padding: 0px;
      font-family: 'Montserrat';
      font-size: 14px;
      color: white;
      display: flex;
      gap: 10px;
      align-items: unset;
      margin-bottom: 12px;
    }
  `

  constructor () {
    super ()
  }

  render () {
    return html `
      <div class="list">
        <h5>Data Sync Relationships</h5>
        <p>A Data Sync Relationships não apenas simplifica as operações financeiras, mas também aprimora o atendimento ao cliente, permitindo que as empresas aprimorem suas relações com os clientes e tomem decisões estratégicas com base em dados detalhados e análises. Com foco na eficiência e na personalização, a CRM ProFinance se tornou uma parceira confiável para empresas que desejam otimizar sua gestão de relacionamento com o cliente e melhorar seu desempenho financeiro.</p>
      </div>

      <div class="list">
        <h5>Produto</h5>
        <span>CRM ProFinance</span>
      </div>

      <div class="list">
        <h5>Segue-nos noutras plataformas</h5>
        <span><a>YouTube</a></span>
        <span><a>Instagram</a></span>
        <span><a>Facebook</a></span>
        <span><a>Linkedin</a></span>
      </div>

      <div class="list">
        <h5>Segue-nos noutras plataformas</h5>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" /></svg>
          Porto, Campanha
        </span>

        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" /></svg>
          info@dsrelationship.davidxavier.me
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
          +351 931234567
        </span>
      </div>
    `
  }
}
window.customElements.define('app-contact', AppContact)
