import { Tipo_de_productos } from './../../../../../../../back/node_modules/.prisma/client/index.d';
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
  fechaCreacion: Date,
  estadoProducto: string,
  duracion: string,
  miniDescripcion: string,
  material: string,
  premium: boolean | null,
  idTipoProducto: number,
  Tipo_de_productos?: TipoProducto,
  aroma?: Aroma

  ImagenProducto?: ImagenProducto[]
}

export interface ImagenProducto{
  id: number,
  url: string
}
