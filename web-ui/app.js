import { LitElement, css, html } from 'lit'

export class App extends LitElement {

  static properties = {
    originUrl: { type: String },
    sessionData: { type: String }
  }

  static styles = css `
    :host {
      position: relative;
      display: block;
      width: 100vw;
      height: 100vh;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
  `

  constructor() {
    super()
    window.app = this
    this.sessionData = {}
    this.originUrl = window.location.origin // PRODUCTION
    this.originUrl = 'http://127.0.0.1:3001' // DEV

    if (localStorage.getItem("token")) {
      this.sessionData.token = localStorage.getItem("token")
    }
  }

  firstUpdated () {
    window.addEventListener("popstate", function (event) {
      window.app.requestUpdate()
    });

  }

  render() {
    return this.renderRoute()
  }

  renderRoute () {
    const route = window.location.pathname

    switch (route) {
      case '/':
        import ('./app-layout')
        return html `<app-layout/>`
        break;
      case '/login':
        import ('./app-login')
        return html `<app-login></app-login>`
        break;
      case '/dashboard':
        import ('./app-dashboard')
        return html `<app-dashboard></app-dashboard>`
        break;
    }
  }
}
window.customElements.define('app-component', App)
