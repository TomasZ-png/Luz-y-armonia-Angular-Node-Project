import { Producto } from "./product.interface";

export interface ProductoCarrito {
  id: number,
  idCarrito: number,
  idProducto: number,
  cantidad: number,
  Producto: Producto
}
