import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement("not-found")
export class NotFound extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    p {
      color: blue;
      cursor: pointer;
    }

    p:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html `
      <h1>Error 404 - Page not found</h1>
      <p @click="${ ()=>history.back() }">Return</p>  
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "not-found": NotFound
  }
};