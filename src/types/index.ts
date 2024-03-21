export interface Accionista {
  id: string | number;
  NIT: string;
  Nombre: string;
  TipoDocumento: string;
  Documento: number;
  Porcentaje: string;
  CantidadAccionitas?: number;
}

export interface AccionistaDetalle extends Accionista {
  esPEP: boolean;
  accionistasRelacionados?: AccionistaDetalle[];
}
