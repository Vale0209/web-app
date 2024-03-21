import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement("reminder-info")
export class ReminderInfo extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display:block;
      background-color: steelblue;
      text-align:center;
      padding: 1em;
      margin: 1em;
    }
  `;

  render() {
    return html `
      <h1>❕</h1>
      <p>Recuerda que si deseas actualizar la información de los accionistas, deberas dirigirte a tu oficina o canal web</p>     
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "reminder-info": ReminderInfo
  }
};