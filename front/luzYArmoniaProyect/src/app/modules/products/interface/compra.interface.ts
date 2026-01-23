import { Producto } from "./product.interface";

export interface CompraProducto{
  id: number,
  idCompra: number,
  idProducto: number,
  cantidad: number,
  producto?: Producto
}
