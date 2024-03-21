import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Actions
import { getAccionistasData } from '../actions/accionistas.action';
import { Accionista } from '../types';

// Components
import '../components/accionista-card';
import '../components/reminder-info';

@customElement("home-page")
export class HomePage extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;      
    }

    h1 {
      font-size: 1.2em;
    }

    button {
      margin: 0 auto;
      padding: 0.5em 1.5em;
      border: none;
      background-color: steelblue;
      color: white;
      cursor: pointer;
    }
  `;

  @property({attribute: false})
  accionistas: Accionista[] | undefined = [];
  
  constructor() {
    super();

    this.getAccionistasData();
  };

  private header() {
    return html `
      <h1>
        ACCIONISTAS
        <span>(2 of 3)</span>
      </h1>  
    `;
  }

  private description() {
    return html `
    <strong>
      Esta es la informacion sobre los accionistas de tu empresa.
    </strong>
    `
  };
  
  public render() {

    return html `
      ${ this.header() }
      ${ this.description() }
      ${ this.accionistas?.map((accionista: Accionista)=>
        html `<accionista-card accionista="${ JSON.stringify(accionista) }"></accionista-card>`)
      }
      <reminder-info></reminder-info>
      <button>Continuar</button>
    `;
  };

  private async getAccionistasData () {
    try {
      const data = await getAccionistasData();
      this.accionistas = data;
    } catch (err) {
      console.error(err);
    };
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage
  }
};