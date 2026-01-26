import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../../products/interface/product.interface';
import { Router } from '@angular/router';
import { CarritoService } from '../../../../api/services/carritoService/carritoService.service';
import { ProductoCarrito } from '../../../products/interface/productoCarrito.interface';
import { environment } from '../../../../../environments/environment';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { CompraService } from '../../../../api/services/compraService/compra.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-mi-carrito-component',
  imports: [Toast],
  templateUrl: './mi-carrito-component.html',
  styleUrl: './mi-carrito-component.css',
  providers: [ConfirmationService, MessageService],

})
export class MiCarritoComponent implements OnInit{

  private router = inject(Router);
  private carritoService = inject(CarritoService);
  private productoService = inject(ProductService);
  private compraService = inject(CompraService);
  private imageUrl = environment.img_url;
  private messageService = inject(MessageService);
  private compraExito = false;
  productos: ProductoCarrito[] = [];
  precioTotal: number = 0;

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(){
    this.carritoService.obtenerCarritoPorUsuario().subscribe({
      next: (data) => {
        this.productos = data.Mi_Carrito_Producto || [];
        console.log('Productos crudos:', JSON.stringify(this.productos, null, 2));

        this.calcularTotalCarrito();
      },
      error: (error) => {
        console.error('Error al cargar productos del carrito: ', error);
      }
    })
  }

  agregarProductoAlCarrito(id:number){
    this.productoService.getProduct(id).subscribe({
      next: (data) => {
        const cantidadEnElCarrito = this.productos.find(p => p.idProducto === id)?.cantidad;
        console.log('Cantidad en el carrito:', cantidadEnElCarrito);
        if(cantidadEnElCarrito! < data.stock){
          this.carritoService.agregarProductoAlCarrito(id, { cantidad: 1 }).subscribe({
            next: (data) => {
              console.log('Producto agregado al carrito: ', data);
              this.cargarCarrito();
            },
            error: (error) => {
              console.error('Error al agregar producto al carrito: ', error);
            }
          })
        }
      }
    });
  }

  calcularTotalCarrito(){
    let total:number = 0;
      for(const producto of this.productos){
        total += producto.Producto.precio * producto.cantidad;
      }
      this.precioTotal = total;
      console.log('precio:' + total);
  }

  getPrimerImagen(productoCarrito: ProductoCarrito){
    let producto: Producto = productoCarrito.Producto;

    return producto.ImagenProducto?.length ?
      this.imageUrl + producto.ImagenProducto[0].url :
      'assets/no-image.png';
  }

  eliminarProducto(id: number){
    this.carritoService.eliminarProductoAlCarrito(id).subscribe({
      next: () => {
        this.cargarCarrito();
      },
      error: () => {
        console.log('Error al eliminar el producto del carrito.')
      }
    })
  }

  verProducto(id:number | undefined){
    this.router.navigate([`/producto/${id}`]);
  }

  comprarCarrito(){
    this.compraService.comprarCarrito().subscribe({
      next: () => {
        this.compraExito = true;
        this.cargarCarrito();
        this.messageService.add({
            severity: 'success',
            summary: 'Comprado',
            detail: 'Carrito comprado exitosamente'
        })
      },
      error: (error) => {
        if(this.productos.length === 0){
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El carrito esta vacio.'
        });
        } else {

          console.log('Error al comprar', error)
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al comprar el carrito'
          })
        }
      }
    })
  }

}
