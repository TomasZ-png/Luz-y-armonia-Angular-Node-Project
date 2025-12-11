import { Aroma } from "./aroma.interface"

export interface Producto {
  id?: number,
  nombre: string,
  idAroma: number,
  precio: number,
  stock: number,
  idTamanio: number | null,
  mililitros: number | null,
  premium: boolean | null
  aroma?: Aroma
}
