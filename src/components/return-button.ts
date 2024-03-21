import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement("return-button")
export class ReturnButton extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    .close {
      position: absolute;
      top: -0.8em;
      right: 0.5em;
      font-size: 1.1em;
      cursor: pointer;
    }
  `;

  render() {
    return html `
      <p class="close" @click="${ this.return }">✖</p>    
    `;
  };

  private return() {
    location.href = "/";
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "return-button": ReturnButton
  }
};