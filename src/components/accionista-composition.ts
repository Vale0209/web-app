import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Actions
import { getAccionistasByNIT } from '../actions/accionistas.action';

// Types
import { Accionista } from '../types';

// Components
import './accionista-card';

@customElement("accionista-composition")
export class AccionistaComposition extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    h2 {
      font-size: 1em;
    }
  `;

  @property({ type: String })
  nit: string = "";

  @property({ attribute: false })
  accionistas : Accionista[] = [];

  constructor() {
    super();

    let counter = 1; 

    const interval = setInterval(()=>{
      counter++;

      this.getAccionistasData(JSON.parse(this.nit));

      if(counter > 1) {
        clearInterval(interval);
      };
    },1000);
  };
  
  render() {

    return html `
      <h2>Composicion del accionista</h2>
      ${ this.accionistas.map(accionista => html `<accionista-card accionista="${ JSON.stringify(accionista) }"></accionista-card>`) }      
    `;
  };

  private async getAccionistasData(nit:string) {

    const currentId = location.pathname.split("/")[2];

    try {
      const data = await getAccionistasByNIT(nit);
      this.accionistas = data?.filter(accionista => accionista.Documento !== +currentId) as Accionista[];
    } catch(err) {
      console.error(err);
    };
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "accionista-composition": AccionistaComposition
  }
};