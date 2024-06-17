import { estado } from "../enums/estado";

export interface facturas {
  id: number;
  cliente: string;
  monto: number;
  fecha_emision: Date;
  estado: estado;
}
