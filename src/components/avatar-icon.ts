import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { firstLastInitialName, isCompany } from '../utils';

@customElement("avatar-icon")
export class AvatarIcon extends LitElement {

  private generateRandomColor(): string {
    const hue = Math.random() * 360;
    const saturation = 70 + Math.random() * 30; // Adjust saturation range
    const lightness = 50 + Math.random() * 10; // Adjust lightness range
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.1em;
    }
  `;

  @property({ type: String })
  name: string = "";  

  private backgroundColor: string = this.generateRandomColor();

  public render() {

    this.style.backgroundColor = this.backgroundColor;

    return html `
    <div class="avatar">${ isCompany(this.name) ? "🏢" :  firstLastInitialName(this.name) }</div>
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "avatar-icon": AvatarIcon
  }
};