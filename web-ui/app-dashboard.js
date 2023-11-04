import { LitElement, css, html } from 'lit'

export class AppDashboard extends LitElement {

  static properties = {
    loading: { type: Boolean }
  }

  static styles = css `
  `

  constructor () {
    super ()
    this.loading = true

    if (window.app.sessionData.token == null) {
      window.location.href = '/'; //relative to domain
    } else {
      this.validate ()
    }
  }

  render () {
    if (this.loading == true) return

    return html `
      <h1>${window.app.sessionData.name}</h1>
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
}
window.customElements.define('app-dashboard', AppDashboard)
