import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Types
import { Accionista } from '../types';

// Components
import './avatar-icon';

@customElement("accionista-card")
export class AccionistaCard extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    a {
      display: flex;
      align-items: center;
      gap: 1em;
      padding: 1em;
      border-bottom: 1px solid lightgray;
      margin: 0 1em;
      text-decoration: none;
      color: black;
    }

    .avatar {
      background-color: steelblue;
      width: 120px;
    }

    .person {
      font-style: italic;
    }
    
    .person .person--name {
      font-style: normal;
      color: steelblue;
    }
    
    .person .person--percentage {
      color: green;
    }

  `;

  @property({type: Map})
  accionista: string = "";

  render() {

    const accionista : Accionista = JSON.parse(this.accionista);

    return html `
      <a href="/accionista/${ accionista.Documento }">
        <avatar-icon name="${ accionista.Nombre }"></avatar-icon>
        <div class="person">
          <p class="person--name">${ accionista.Nombre }</p>
          <p>${ accionista.TipoDocumento } ${ accionista.Documento }</p>
          ${ accionista.CantidadAccionitas && accionista.CantidadAccionitas+" accionistas" }
          <p class="person--percentage">Participación: ${ accionista.Porcentaje }</p>
        </div>
      </a>
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "accionista-card": AccionistaCard
  }
};