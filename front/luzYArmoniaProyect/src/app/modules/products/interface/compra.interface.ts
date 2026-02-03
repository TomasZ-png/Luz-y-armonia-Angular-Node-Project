import { Producto } from "./product.interface";

export interface CompraProducto{
  id: number,
  idCompra: number,
  idProducto: number,
  cantidad: number,
  producto?: Producto
}

export interface Compra{
  id: number,
  fecha: Date,
  total: number,
  estado: string,
  paymentId?: string,
  productos?: CompraProducto[]
}
