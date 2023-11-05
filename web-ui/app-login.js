import { LitElement, css, html } from 'lit'

export class AppLogin extends LitElement {

  static properties = {
    loading: { type: Boolean }
  }

  static styles = css `
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      position: relative;
      display: grid;
      grid-template-columns: 500px 450px;
      height: 600px;
      border-radius: 10px;
      box-shadow: 0 2px 50px rgba(50, 40, 85, 0.2);
      background: white;
      overflow: hidden;
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

    .container > .panel {
      background: var(--primary-color);
      padding: 24px;
      display: flex;
      flex-direction: column;
    }

    @media only screen and (max-width: 1060px) {
      .container {
        grid-template-columns: 400px 350px;
        height: 500px;
      }
    }

    @media only screen and (max-width: 820px) {
      .container {
        grid-template-columns: 100%;
        width: 90%;
      }

      .container > .panel {
        display: none;
      }
    }

    .container > .panel > #logo {
      width: 40%;
      fill: white;
    }

    .image {
      padding: 0px;
      filter: drop-shadow(2px 4px 6px#333);
    }

    h2 {
      font-family: 'Montserrat';
      font-size: 32px;
      color: white;
      text-transform: uppercase;
      text-align: center;
      margin: auto auto;
    }

    form {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 24px;
      justify-content: center;
      gap: 24px;
    }

    form > h1 {
      font-family: 'Montserrat';
      text-align: center;
      color: var(--primary-color);
      font-size: 32px;
      text-transform: uppercase;
      margin: 0px;
    }

    form > input {
      border: none;
      outline: none;
      background: #ddd;
      padding: 16px 0px;
      color: #333;
      background: none;
      font-size: 16px;
      border-bottom: 1px solid #d4d4d4;
    }

    form > input::placeholder {
      font-weight: light;
      font-style: italic;
    }

    form > input[type="submit"] {
      font-family: 'Montserrat';
      background: var(--secondary-color);
      border-radius: 5px;
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 2px;
      border-bottom: none;
      box-shadow: 0 2px 10px rgba(50, 40, 85, 0.2);
      cursor: pointer;
      transition: 100ms all ease-in-out;
    }

    form > input[type="submit"]:active {
      transform: scale(0.95);
    }

    form > input[type="submit"].success {
      background: green;
    }

    .error-message {

      font-family: 'Montserrat';
      position: absolute;
      display: block;
      width: calc(100% - 64px);
      padding: 16px;
      margin:16px;
      left: 0px;
      bottom: -100px;
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      font-size: 15px;
      letter-spacing: 1px;
      font-weight: 400;

      transition: 300ms all ease-in-out;
    }

    .error-message.active {
      bottom: 0px;
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

  `

  constructor () {
    super ()
  }

  render () {
    return html `

      <section class="container">
        <div class="loader ${this.loading == true ? 'active' : ''}" id="loader">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="panel">
          <h2>bem-vindo</h2>
          <img class="image" src="svgs/login.svg" />
          <svg id="logo" width="429" height="33.66540720785335" viewBox="0 0 369.6862745098039 29.01081345111143" class="css-1j8o68f"><defs id="SvgjsDefs1180"></defs><g id="SvgjsG1181" featurekey="HdFLvg-0" transform="matrix(0.34507305174812075,0,0,0.34507305174812075,0,-2.2844703815789966)" ><g xmlns="http://www.w3.org/2000/svg"><path d="M36.478,60.17c1.729-1.139,3.732-1.832,5.796-2.002c0.351-0.031,0.703-0.045,1.047-0.045c0.125,0,0.241,0.002,0.349,0.004   c0.2,0.008,0.399,0.018,0.597,0.031l0.012-0.092c0.994-8.77,7.074-16.161,15.492-18.829c0.81-0.258,1.644-0.471,2.479-0.633   c1.414-0.276,2.863-0.416,4.309-0.416c0.983,0,1.959,0.065,2.923,0.193c-2.316-8.972-9.141-16.129-17.915-18.912   c-0.967-0.308-1.959-0.562-2.973-0.759c-1.673-0.326-3.403-0.498-5.175-0.498c-8.112,0-15.382,3.59-20.318,9.266   c5.369,1.795,7.584,6.325,7.584,6.325c-4.058-3.433-9.74-3.493-9.74-3.493c-0.025,0-0.05,0-0.075,0C9.344,30.311,0,39.654,0,51.18   c0,11.527,9.344,20.871,20.871,20.871H30.95c-0.058-0.482-0.088-0.973-0.088-1.469C30.861,66.379,32.962,62.484,36.478,60.17z"></path><path d="M87.47,49.861c-0.469-0.117-0.945-0.213-1.431-0.289c-0.467-0.07-0.94-0.121-1.421-0.148   c-0.325-0.02-0.654-0.031-0.985-0.031c-0.019,0-0.038,0-0.057,0c0,0-4.302,0.045-7.375,2.645c0,0,1.677-3.432,5.743-4.789   c-0.19-0.221-0.389-0.435-0.59-0.648c-0.811-0.855-1.696-1.642-2.644-2.348c-0.808-0.601-1.662-1.143-2.554-1.622   c-1.283-0.688-2.647-1.24-4.075-1.642c-0.354-0.1-0.711-0.189-1.073-0.27c-0.353-0.08-0.71-0.149-1.068-0.209   c-1.101-0.183-2.23-0.279-3.382-0.279c-1.341,0-2.65,0.129-3.918,0.377c-0.768,0.15-1.52,0.341-2.252,0.573   c-7.531,2.39-13.166,9.036-14.082,17.114c0.072,0.041,0.146,0.082,0.221,0.125c0.492,0.283,0.947,0.607,1.368,0.963   c0.663,0.559,1.238,1.188,1.728,1.818c0.467,0.604,0.857,1.209,1.173,1.758c0.715,1.242,1.052,2.199,1.052,2.199   c-0.401-0.803-0.912-1.475-1.462-2.041c-0.625-0.641-1.301-1.139-1.924-1.518c-1.248-0.758-2.288-1.039-2.288-1.039   c-0.816-0.232-1.675-0.365-2.561-0.391c-0.097-0.004-0.195-0.006-0.292-0.006c-0.296,0-0.588,0.014-0.877,0.037   c-1.78,0.148-3.432,0.744-4.844,1.674c-2.828,1.863-4.696,5.066-4.696,8.707c0,0.498,0.038,0.988,0.104,1.469   c0.05,0.348,0.115,0.688,0.198,1.021c0.085,0.348,0.186,0.689,0.306,1.021c1.442,4.025,5.29,6.906,9.81,6.906h40.312   c8.729,0,15.805-7.076,15.805-15.805C99.438,57.791,94.345,51.576,87.47,49.861z"></path></g></g><g id="SvgjsG1182" featurekey="VomJeJ-0" transform="matrix(1.518890877945287,0,0,1.518890877945287,51.691287161955024,-8.019744154227103)" ><path d="M10.36 19.12 q-0.64 0.52 -1.68 0.76 t-2.3 0.24 q-0.62 0 -1.79 -0.02 t-2.93 -0.06 l-0.14 -0.14 l0 -13.46 l0.14 -0.14 q1.16 -0.04 2.41 -0.06 t2.63 -0.02 q1.7 0 2.84 0.54 t1.82 1.48 t0.96 2.21 t0.28 2.73 q0 2 -0.46 3.46 t-1.78 2.48 z M6.68 17.62 q2.64 0 2.64 -4.44 q0 -4.46 -2.64 -4.46 l-1.13 0 t-0.85 -0.02 l0 8.94 q0.36 -0.02 0.85 -0.02 l1.13 0 z M22.78 18.56 q-0.1 0.42 -0.38 0.9 t-0.58 0.7 q-1.4 -0.04 -2.16 -1.06 q-1.3 1.2 -2.82 1.2 q-0.78 0 -1.36 -0.25 t-0.98 -0.67 t-0.6 -0.97 t-0.2 -1.15 q0 -0.86 0.31 -1.51 t0.85 -1.08 t1.26 -0.65 t1.54 -0.22 q0.46 0 0.81 0.01 t0.61 0.03 l0 -0.38 q0 -1.26 -1.3 -1.26 q-0.84 0 -2.94 0.64 q-0.6 -0.7 -0.76 -2.18 q0.48 -0.18 1.07 -0.34 t1.21 -0.28 t1.22 -0.19 t1.08 -0.07 q0.7 0 1.35 0.2 t1.14 0.61 t0.78 1.06 t0.29 1.55 l0 4.06 q0 0.92 0.56 1.3 z M16.74 17.06 q0 0.94 1.08 0.94 q0.56 0 1.26 -0.58 l0 -1.6 q-0.4 -0.02 -0.67 -0.03 t-0.41 -0.01 q-1.26 0 -1.26 1.28 z M30.259999999999998 10 q0.12 0.56 0.12 1.12 t-0.12 1.1 l-2.38 -0.04 l0 4.6 q0 0.94 0.88 0.94 l1.12 0 q0.26 0.72 0.26 1.32 t-0.08 0.86 q-1.48 0.2 -2.72 0.2 q-2.52 0 -2.52 -2.78 l0 -5.12 l-1.56 0.02 q-0.14 -0.5 -0.14 -1.09 t0.14 -1.13 l1.56 0.04 l0 -1.16 q0 -1.02 0.39 -1.45 t1.31 -0.43 l1.22 0 l0.14 0.14 l0 2.9 z M40.4 18.56 q-0.1 0.42 -0.38 0.9 t-0.58 0.7 q-1.4 -0.04 -2.16 -1.06 q-1.3 1.2 -2.82 1.2 q-0.78 0 -1.36 -0.25 t-0.98 -0.67 t-0.6 -0.97 t-0.2 -1.15 q0 -0.86 0.31 -1.51 t0.85 -1.08 t1.26 -0.65 t1.54 -0.22 q0.46 0 0.81 0.01 t0.61 0.03 l0 -0.38 q0 -1.26 -1.3 -1.26 q-0.84 0 -2.94 0.64 q-0.6 -0.7 -0.76 -2.18 q0.48 -0.18 1.07 -0.34 t1.21 -0.28 t1.22 -0.19 t1.08 -0.07 q0.7 0 1.35 0.2 t1.14 0.61 t0.78 1.06 t0.29 1.55 l0 4.06 q0 0.92 0.56 1.3 z M34.36 17.06 q0 0.94 1.08 0.94 q0.56 0 1.26 -0.58 l0 -1.6 q-0.4 -0.02 -0.67 -0.03 t-0.41 -0.01 q-1.26 0 -1.26 1.28 z M45.67999999999999 18.82 q0.06 -0.66 0.41 -1.32 t0.83 -1.08 q2.14 1.3 4.06 1.3 q0.84 0 1.23 -0.38 t0.39 -0.94 q0 -0.94 -1.26 -1.48 l-2.36 -1 q-1.38 -0.62 -2.12 -1.49 t-0.74 -2.21 q0 -0.92 0.37 -1.68 t1.04 -1.32 t1.59 -0.87 t2.04 -0.31 q2.24 0 4.52 1.14 q-0.1 1.54 -1.08 2.4 q-2.04 -0.98 -3.6 -0.98 q-0.8 0 -1.2 0.36 t-0.4 0.82 q0 0.78 1.18 1.26 l2.4 1.02 q1.52 0.64 2.27 1.64 t0.75 2.32 q0 0.94 -0.34 1.72 t-1.01 1.35 t-1.67 0.89 t-2.34 0.32 q-2.6 0 -4.96 -1.48 z M66.03999999999999 10.34 l-2.46 9.4 q-0.58 2.16 -1.54 3.32 q-1.1 1.32 -3.38 1.32 q-1.22 0 -2.42 -0.4 q-0.06 -0.54 0.12 -1.21 t0.5 -1.03 q0.9 0.3 1.8 0.3 q1.48 0 1.96 -1.62 l0.08 -0.28 q-1.74 0 -2.08 -1.26 l-2.32 -8.62 q0.92 -0.42 1.72 -0.42 t1.17 0.3 t0.55 1.04 l0.92 3.84 q0.14 0.54 0.46 2.64 q0.02 0.14 0.16 0.14 l1.74 -7.76 q0.48 -0.14 1.3 -0.14 q0.92 0 1.6 0.22 z M75.94 13.4 l0 4.1 q0 1.32 0.48 1.98 q-0.76 0.68 -1.82 0.68 q-1.04 0 -1.42 -0.48 t-0.38 -1.46 l0 -4.26 q0 -0.68 -0.18 -1 t-0.7 -0.32 q-0.3 0 -0.68 0.16 t-0.78 0.52 l0 6.68 q-0.34 0.06 -0.74 0.09 t-0.82 0.03 t-0.82 -0.03 t-0.74 -0.09 l0 -9.98 l0.14 -0.14 l1.18 0 q1.22 0 1.64 1.2 q1.4 -1.24 2.78 -1.24 q1.4 0 2.13 0.97 t0.73 2.59 z M83.25999999999999 14.440000000000001 l0 -0.26 q0 -1.12 -0.24 -1.63 t-0.9 -0.51 q-0.7 0 -0.98 0.69 t-0.28 2.29 q0 0.8 0.11 1.34 t0.32 0.87 t0.53 0.48 t0.76 0.15 q0.46 0 1.02 -0.2 t1.2 -0.64 q0.18 0.1 0.37 0.29 t0.35 0.43 t0.28 0.51 t0.18 0.51 q-0.66 0.7 -1.72 1.12 t-2.16 0.42 q-2.14 0 -3.28 -1.4 t-1.14 -3.98 q0 -1.32 0.37 -2.3 t0.98 -1.62 t1.4 -0.96 t1.65 -0.32 q0.88 0 1.61 0.24 t1.26 0.68 t0.82 1.05 t0.29 1.35 q0 0.84 -0.49 1.18 t-1.21 0.34 q-0.6 0 -1.1 -0.12 z M102.30000000000001 10.56 q0 0.66 -0.2 1.25 t-0.53 1.06 t-0.78 0.82 t-0.93 0.53 q1.04 0.38 1.54 1.84 l0.6 1.7 q0.34 1 1 1.48 q-0.3 0.4 -0.9 0.67 t-1.32 0.27 t-1.12 -0.41 t-0.74 -1.43 l-0.72 -2.1 q-0.22 -0.6 -0.59 -0.92 t-1.11 -0.32 l-0.82 0 l0 5 q-0.64 0.12 -1.6 0.12 t-1.58 -0.12 l0 -13.56 l0.14 -0.14 q1.74 -0.04 2.93 -0.06 t1.87 -0.02 q1.1 0 2 0.27 t1.53 0.81 t0.98 1.36 t0.35 1.9 z M95.68 8.62 l0 3.92 q0.9 0 1.54 -0.03 t1.03 -0.24 t0.59 -0.59 t0.2 -1.1 q0 -1.94 -1.88 -1.94 l-0.83 0 t-0.65 -0.02 z M111.94000000000001 16.02 l-5.22 0 q0.04 0.9 0.46 1.4 t1.38 0.5 q0.48 0 1.11 -0.14 t1.45 -0.46 q0.66 0.68 0.82 1.84 q-1.6 1.14 -3.92 1.14 q-1.26 0 -2.11 -0.4 t-1.38 -1.12 t-0.75 -1.7 t-0.22 -2.14 q0 -1.12 0.27 -2.07 t0.82 -1.65 t1.4 -1.1 t1.99 -0.4 q0.96 0 1.73 0.32 t1.31 0.88 t0.83 1.34 t0.29 1.7 q0 1.22 -0.26 2.06 z M106.7 13.86 l2.64 0 l0 -0.22 q0 -0.74 -0.33 -1.22 t-0.99 -0.48 q-0.64 0 -0.95 0.45 t-0.37 1.47 z M118 17.72 l0.54 0 q0.24 0.66 0.24 1.32 t-0.06 0.86 q-1.2 0.2 -2.14 0.2 q-1.36 0 -1.93 -0.67 t-0.57 -2.11 l0 -11.9 l0.12 -0.14 l1.22 0 q0.94 0 1.32 0.42 t0.38 1.46 l0 9.62 q0 0.94 0.88 0.94 z M128.84 18.56 q-0.1 0.42 -0.38 0.9 t-0.58 0.7 q-1.4 -0.04 -2.16 -1.06 q-1.3 1.2 -2.82 1.2 q-0.78 0 -1.36 -0.25 t-0.98 -0.67 t-0.6 -0.97 t-0.2 -1.15 q0 -0.86 0.31 -1.51 t0.85 -1.08 t1.26 -0.65 t1.54 -0.22 q0.46 0 0.81 0.01 t0.61 0.03 l0 -0.38 q0 -1.26 -1.3 -1.26 q-0.84 0 -2.94 0.64 q-0.6 -0.7 -0.76 -2.18 q0.48 -0.18 1.07 -0.34 t1.21 -0.28 t1.22 -0.19 t1.08 -0.07 q0.7 0 1.35 0.2 t1.14 0.61 t0.78 1.06 t0.29 1.55 l0 4.06 q0 0.92 0.56 1.3 z M122.80000000000001 17.06 q0 0.94 1.08 0.94 q0.56 0 1.26 -0.58 l0 -1.6 q-0.4 -0.02 -0.67 -0.03 t-0.41 -0.01 q-1.26 0 -1.26 1.28 z M136.32000000000002 10 q0.12 0.56 0.12 1.12 t-0.12 1.1 l-2.38 -0.04 l0 4.6 q0 0.94 0.88 0.94 l1.12 0 q0.26 0.72 0.26 1.32 t-0.08 0.86 q-1.48 0.2 -2.72 0.2 q-2.52 0 -2.52 -2.78 l0 -5.12 l-1.56 0.02 q-0.14 -0.5 -0.14 -1.09 t0.14 -1.13 l1.56 0.04 l0 -1.16 q0 -1.02 0.39 -1.45 t1.31 -0.43 l1.22 0 l0.14 0.14 l0 2.9 z M141.96000000000004 12.32 l0 7.68 q-0.34 0.06 -0.74 0.09 t-0.82 0.03 t-0.83 -0.03 t-0.75 -0.09 l0 -6.62 q0 -1.16 -0.94 -1.16 l-0.3 0 q-0.12 -0.38 -0.12 -1.06 q0 -0.66 0.12 -1.12 q0.52 -0.04 0.96 -0.07 t0.8 -0.03 l0.44 0 q1.02 0 1.6 0.64 t0.58 1.74 z M138.46000000000004 6 q0.58 -0.32 1.5 -0.32 q0.94 0 1.46 0.32 q0.24 0.54 0.24 1.16 t-0.24 1.16 q-0.58 0.3 -1.52 0.3 t-1.44 -0.3 q-0.24 -0.54 -0.24 -1.16 t0.24 -1.16 z M151.52000000000004 10.9 q1.44 1.44 1.44 4.12 q0 1.2 -0.31 2.18 t-0.9 1.67 t-1.45 1.06 t-1.98 0.37 t-1.97 -0.38 t-1.44 -1.07 t-0.89 -1.67 t-0.3 -2.16 q0 -1.2 0.3 -2.17 t0.88 -1.67 t1.44 -1.08 t1.98 -0.38 q1.98 0 3.2 1.18 z M148.34000000000003 12.059999999999999 q-0.44 0 -0.71 0.21 t-0.43 0.57 t-0.22 0.83 t-0.06 1.01 q0 0.84 0.05 1.45 t0.2 1.02 t0.42 0.61 t0.71 0.2 q0.88 0 1.16 -0.77 t0.28 -2.19 q0 -1.44 -0.28 -2.19 t-1.12 -0.75 z M163.36000000000004 13.4 l0 4.1 q0 1.32 0.48 1.98 q-0.76 0.68 -1.82 0.68 q-1.04 0 -1.42 -0.48 t-0.38 -1.46 l0 -4.26 q0 -0.68 -0.18 -1 t-0.7 -0.32 q-0.3 0 -0.68 0.16 t-0.78 0.52 l0 6.68 q-0.34 0.06 -0.74 0.09 t-0.82 0.03 t-0.82 -0.03 t-0.74 -0.09 l0 -9.98 l0.14 -0.14 l1.18 0 q1.22 0 1.64 1.2 q1.4 -1.24 2.78 -1.24 q1.4 0 2.13 0.97 t0.73 2.59 z M164.90000000000003 19.32 q0.02 -0.52 0.27 -1.14 t0.59 -0.98 q1.6 0.84 2.78 0.84 q0.56 0 0.86 -0.19 t0.3 -0.51 q0 -0.6 -0.92 -0.9 l-1.1 -0.42 q-2.5 -0.92 -2.5 -3 q0 -1.52 1.05 -2.41 t2.83 -0.89 q0.88 0 1.94 0.25 t1.74 0.59 q0.04 0.56 -0.22 1.23 t-0.64 0.95 q-1.68 -0.76 -2.8 -0.76 q-0.4 0 -0.61 0.18 t-0.21 0.46 q0 0.48 0.76 0.76 l1.24 0.44 q2.66 0.94 2.66 3.22 q0 1.5 -1.1 2.38 t-3.14 0.88 t-3.78 -0.98 z M183.08 13.4 l0 4.1 q0 1.34 0.5 1.98 q-0.76 0.68 -1.84 0.68 q-1.04 0 -1.42 -0.48 t-0.38 -1.46 l0 -4.26 q0 -0.68 -0.18 -1 t-0.7 -0.32 q-0.3 0 -0.68 0.16 t-0.78 0.52 l0 6.68 q-0.66 0.12 -1.52 0.12 t-1.52 -0.12 l0 -14.58 l0.14 -0.14 l1.2 0 q0.96 0 1.33 0.42 t0.37 1.46 l0 3.78 q1.34 -1.1 2.68 -1.1 t2.07 0.97 t0.73 2.59 z M189.02000000000004 12.32 l0 7.68 q-0.34 0.06 -0.74 0.09 t-0.82 0.03 t-0.83 -0.03 t-0.75 -0.09 l0 -6.62 q0 -1.16 -0.94 -1.16 l-0.3 0 q-0.12 -0.38 -0.12 -1.06 q0 -0.66 0.12 -1.12 q0.52 -0.04 0.96 -0.07 t0.8 -0.03 l0.44 0 q1.02 0 1.6 0.64 t0.58 1.74 z M185.52000000000004 6 q0.58 -0.32 1.5 -0.32 q0.94 0 1.46 0.32 q0.24 0.54 0.24 1.16 t-0.24 1.16 q-0.58 0.3 -1.52 0.3 t-1.44 -0.3 q-0.24 -0.54 -0.24 -1.16 t0.24 -1.16 z M196.28000000000003 20.2 q-0.92 0 -1.84 -0.42 l0 2.66 q0 1.04 -0.38 1.46 t-1.34 0.42 l-1.2 0 l-0.14 -0.14 l0 -14.16 l0.14 -0.14 l0.82 0 q1.14 0 1.7 0.98 q1.14 -1.14 2.78 -1.14 q0.84 0 1.48 0.37 t1.09 1.05 t0.68 1.64 t0.23 2.16 t-0.31 2.18 t-0.85 1.66 t-1.27 1.05 t-1.59 0.37 z M195.90000000000003 12.219999999999999 q-0.84 0 -1.46 0.8 l0 4.4 q0.76 0.46 1.3 0.46 q1.36 0 1.36 -3.02 q0 -2.64 -1.2 -2.64 z M201.34000000000003 19.32 q0.02 -0.52 0.27 -1.14 t0.59 -0.98 q1.6 0.84 2.78 0.84 q0.56 0 0.86 -0.19 t0.3 -0.51 q0 -0.6 -0.92 -0.9 l-1.1 -0.42 q-2.5 -0.92 -2.5 -3 q0 -1.52 1.05 -2.41 t2.83 -0.89 q0.88 0 1.94 0.25 t1.74 0.59 q0.04 0.56 -0.22 1.23 t-0.64 0.95 q-1.68 -0.76 -2.8 -0.76 q-0.4 0 -0.61 0.18 t-0.21 0.46 q0 0.48 0.76 0.76 l1.24 0.44 q2.66 0.94 2.66 3.22 q0 1.5 -1.1 2.38 t-3.14 0.88 t-3.78 -0.98 z"></path></g></svg>


        </div>
        <form @submit=${this.__submit}>

          <h1>Login_!</h1>

          <input id="email" type="email" placeholder="Email" required />
          <input id="password" type="password" placeholder="Password" required />
          <input id="button" type="submit" value="Entrar"/>

          <span id="error" class="error-message"></span>
        </form>
      </section>
    `
  }

  async __submit (e) {
    e.preventDefault()

    this.loading = true

    const email = this.shadowRoot.getElementById('email').value
    const password = this.shadowRoot.getElementById('password').value

    try {

      const result = await fetch (window.app.originUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      })

      if (result.status === 200) {
        // SUCCESS
        const data = await result.json()
        this.shadowRoot.getElementById('button').classList.add('success')
        window.app.sessionData.token = data.token
        localStorage.setItem("token", data.token);
        window.app.changeRoute('/dashboard')
      } else {
        // ERROR
        const data = await result.json()
        this.shadowRoot.getElementById('error').innerHTML = data.message
        this.shadowRoot.getElementById('error').classList.add('active')
        setTimeout(() => {
          this.shadowRoot.getElementById('error').classList.remove('active')
          this.shadowRoot.getElementById('error').innerHTML = ''
        }, 1300)
      }
    } catch (e) {
      console.error (e)
        this.shadowRoot.getElementById('error').innerHTML = 'Ocorreu algum problema a conectar com o servidor, tente de novo!'
        this.shadowRoot.getElementById('error').classList.add('active')
        setTimeout(() => {
          this.shadowRoot.getElementById('error').classList.remove('active')
          this.shadowRoot.getElementById('error').innerHTML = ''
        }, 1300)
    }

    this.loading = false
  }
}
window.customElements.define('app-login', AppLogin)


