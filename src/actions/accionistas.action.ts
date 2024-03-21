import Http from '../http';
import { Accionista } from '../types';

const path : string = '/accionistas';

const http = new Http<Accionista>(path);

export const getAccionistasData = async () : Promise<Accionista[] | undefined > => await http.get();

export const getAccionistasById = 
  async (id: string) : Promise<Accionista | undefined > => await http.getByID(id);

export const updateAccionistasById = 
  async (id: string, data: Accionista) : Promise<Accionista[] | undefined > => await http.updateByID(id, data);

export const getAccionistasByNIT = 
  async (data: string) : Promise<Accionista[] | undefined > => await http.getByQuery("?NIT=", data);