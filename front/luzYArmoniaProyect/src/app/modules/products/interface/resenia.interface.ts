import { Usuario } from "./usuario.interface";

export interface Resenia{
  id: number,
  idProducto: number,
  calificacion: number,
  comentario: string,
  fecha: Date,
  Usuario: Usuario
}
