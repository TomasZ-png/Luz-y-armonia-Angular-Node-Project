import { Aroma } from "./aroma.interface"
import { TipoProducto } from "./tipoProducto.interface"

export interface Producto {
  id?: number,
  nombre: string,
  descripcion: string,
  idAroma: number,
  precio: number,
  stock: number,
  alto: number | null,
  ancho: number | null,
  mililitros: number | null,
  premium: boolean | null
  idTipoProducto: number,
  tipoProducto?: TipoProducto,
  aroma?: Aroma

  ImagenProducto?: ImagenProducto[]
}

export interface ImagenProducto{
  id: number,
  url: string
}
