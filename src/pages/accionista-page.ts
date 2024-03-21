import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Components
import '../components/avatar-icon';
import '../components/accionista-composition';
import '../components/return-button';

// Actions
import { getAccionistasById, updateAccionistasById } from '../actions/accionistas.action';

// Utils
import { isCompany } from '../utils';

// Types
import { Accionista } from '../types/index';

@customElement("accionista-page")
export class AccionistaPage extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items:center;      
    }

    h1 {
      font-size: 0.8em;
      text-align: center;
      font-weight: 300;
    }
    
    fieldset {
      display: flex;
      flex-direction: column;
      gap: 0.8em;
    }

    fieldset > div{
      display: flex;
      flex-direction: column;
      background-color: lightgray;
    }
    
    input, select {
      border: none;
      outline: none;
      background-color: lightgray;
      border-bottom: 1px solid black;
    }

    .percentage {
      flex-wrap: wrap;
    }

    .percentage > input {
      display: inline-block;
      width: 50%;
      color: red;
    }

    form {
      display: flex;
      flex-direction: column;
      alig-items: center;
    }

    button {
      margin: 0 auto;
      padding: 0.5em 2em;
      border: none;
      cursor: pointer;
      color: white;
      background-color: steelblue;
    }
  `;

  @property({attribute: false})
  accionista: Accionista = {
    id: "",
    NIT: "",
    Nombre: "",
    TipoDocumento: "",
    Documento: 0,
    Porcentaje: ""
  };

  @property({attribute: false})
  id: string = "";

  constructor() {
    super();

    // Reading id from the accionista selected
    this.getIdUser();
  };

  render() {

    let { Nombre, Documento, Porcentaje, TipoDocumento, NIT } = this.accionista;

    Porcentaje = Porcentaje.split("%")[0];

    return html `
      <return-button></return-button>
      ${ this.titlePage(Nombre) }
      <avatar-icon name="${ Nombre }"></avatar-icon>
      <h2>${ Nombre }</h2>
      <form id="form" @submit="${ this.handleSubmit }">
        <fieldset>
          <legend>Información sobre el miembro</legend>
          <div>
            <label for="docType">Tipo de documento</label>
            <select id="docType" name="docType">
              ${ this.selectField(TipoDocumento) }
            </select>
          </div>
          <div>
            <label for="id">Numero de identificación</label>
            <input id="id" name="id" type="number" value="${ Documento }" />
          </div>
          ${ this.nameFormField(Nombre) }
          <div class="percentage">
            <label for="percentage">Porcentaje de participación</label>
            <span>
              <input id="percentage" name="percentage" type="number" value="${ +Porcentaje }" />
              %
            </span>
          </div>
        </fieldset>
        ${
          isCompany(Nombre)
          ? html `<accionista-composition nit="${ JSON.stringify(NIT) }"></accionista-composition>`
          : this.policyPEPField()
        }      
        <button type="submit">Salir</button>
      </form>
    `;
  };

  private async handleSubmit(e: Event) {
    e.preventDefault();

    const form = this.shadowRoot?.getElementById("form") as HTMLFormElement;  
    const formData = new FormData(form);
    const values = Object.fromEntries(formData);

    const dataToSend = {
      Nombre: "",
      TipoDocumento: "",
      Documento: 0,
      Porcentaje: ""
    };

    dataToSend["TipoDocumento"] = values.docType as string;
    dataToSend["Documento"] = (values.id as unknown) as number;
    dataToSend["Porcentaje"] = values.percentage+"%" as string;

    if(values.companyName){
      dataToSend["Nombre"] = values.companyName as string;
    } else {
      dataToSend["Nombre"] = values.name + " " + values.lastName as string;
    };

    const rest : Accionista | undefined = await getAccionistasById(values.id as string); 
    
    if((values.pep as string) == "Si") {
      location.href = "/actualizacion-de-datos";
      console.log("yes", values.pep);
    } else {
      console.log("No", values.pep);
    };

    if(
      dataToSend.Nombre==rest!.Nombre &&
      dataToSend.TipoDocumento==rest!.TipoDocumento &&
      dataToSend.Documento==rest!.Documento &&
      dataToSend.Porcentaje==rest!.Porcentaje
    ) {
      if((values.pep as string) == "Si") {
        return location.href = "/actualizacion-de-datos";
      } 

      return location.href = "/";    
    };
      
    this.updateAccionista(dataToSend as Accionista, (values.pep as string) == "Si");
  };

  private async updateAccionista(data: Accionista, isPEP: boolean) {
    try {
      await updateAccionistasById(this.id, data);
      
      alert("Changes were applied!");
      
      location.reload;

      if(isPEP) location.href = "/actualizacion-de-datos";

      setTimeout(()=>{        
        location.href = "/";
      },3000);

    } catch (err) {
      console.error(err);
    };
  };

  private titlePage(name:string) {
    if(isCompany(name)) return html `<h1>Accionista</h1>`;

    return html `<h1>Composición del accionista</h1>`;
  };

  private selectField(docType: string) {

    if(docType == "CC") return html `
      <option value="NIT">NIT</option>
      <option selected value="CC">Cedula</option>      
    `;

    return html `
      <option selected value="NIT">NIT</option>
      <option value="CC">Cedula</option>
    `;
  };

  private nameFormField(name: string) {
    if(isCompany(name)) return html `
    <div>
      <label for="companyName">Razón social</label>
      <input id="companyName" name="companyName" type="text" value="${ name }" />
    </div>
    `;

    return html `
    <div>
      <label for="name">Nombre</label>
      <input id="name" name="name" type="text" value="${ name.split(" ")[0] }" />
    </div>
    <div>
      <label for="lastName">Apellido</label>
      <input id="lastName" name="lastName" type="text" value="${ name.split(" ")[1] }" />
    </div>
    `;
  };

  private policyPEPField() {
    return html `
    <h5>PERSONAS EXPUESTAS POLITICAMENTE (PEP)</h5>
    <p>
      ¿Es una persona expuesta politicamente (PEP), está relacionada, asociada o es familiar de una?
    </p>
    <div>
      <label for="pepYes">Si</label>
      <input type="radio" id="pepYes" name="pep" value="Si">
      <label for="pepNo">No</label>
      <input type="radio" id="pepNo" name="pep" value="No" checked>
    </div>
    `;
  };

  private async getIdUser() {
    const id = location.pathname.split("accionista")[1].replace("/","");

    this.id = id;

    try {
      const accionista :  Accionista | undefined = await getAccionistasById(id);
      this.accionista = accionista as Accionista;

    } catch (err) {
      console.error(err);
    };
  };  
};

declare global {
  interface HTMLElementTagNameMap {
    "about-us-page": AccionistaPage
  }
};