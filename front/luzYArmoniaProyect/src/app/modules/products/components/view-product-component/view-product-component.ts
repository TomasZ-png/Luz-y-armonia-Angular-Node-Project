import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenProducto, Producto } from '../../interface/product.interface';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../api/services/loginService/loginService.service';
import { Button } from "primeng/button";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { ConfirmDialog } from "primeng/confirmdialog";
import { CarritoService } from '../../../../api/services/carritoService/carritoService.service';
import { FavoritoService } from '../../../../api/services/favoritoService/favoritoService.service';
import { CompraService } from '../../../../api/services/compraService/compra.service';
import { CompraProducto, Compra } from '../../interface/compra.interface';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-view-product-component',
  imports: [Button, Toast, ConfirmDialog, FormsModule, ImageModule],
  templateUrl: './view-product-component.html',
  styleUrl: './view-product-component.css',
  standalone: true,
  providers: [ConfirmationService, MessageService],

})


export class ViewProductComponent implements OnInit{

private router = inject(ActivatedRoute);
private routes = inject(Router);
private productoService = inject(ProductService);
productoSeleccionado!: Producto;
imagenesProducto: ImagenProducto[] | undefined = [];
img_url = environment.img_url;
imagenSeleccionada: ImagenProducto | null = null;
private loginService = inject(LoginService);
exito:boolean = false;
exitoFavorito:boolean = false;
private confirmationService = inject(ConfirmationService);
private messageService = inject(MessageService);
private carritoService = inject(CarritoService);
private favoritoService = inject(FavoritoService);
private compraService = inject(CompraService);
idCompra: number = 0;
favorito: boolean = false;
compraExito: boolean = false;
cantidadSeleccionada: number = 1;
sinStock: boolean = false;

ngOnInit(): void {
  const id = Number(this.router.snapshot.paramMap.get('id'));
  if(!id) return;

  this.productoService.getProduct(id).subscribe(producto => {
    this.productoSeleccionado = producto;
    this.imagenesProducto = producto.ImagenProducto;
    this.imagenSeleccionada = this.imagenesProducto?.[0] || null;

    this.productoSinStockDisponible();

    this.favoritoService.productoEnFavoritos(this.productoSeleccionado.id!).subscribe({
      next: (res) => {
        this.favorito = Boolean(res);
        console.log(this.favorito);
      }
    });
  });
}

mostrarImagenSeleccionada(id:number){
  this.imagenSeleccionada = this.imagenesProducto?.find(img => img.id === id) || null;
}

isAdmin(){
  return this.loginService.getUsuarioEnSession()?.rol === 'ADMIN'
}

redirectToUpdate(id:number | undefined){
  this.routes.navigate([`/producto/modificar/${id}`]);
}

activarMensajeAlertaDelete(producto:Producto){

    this.confirmationService.confirm({
      message: `¿Estas seguro de querer eliminar el producto: "<strong>${producto.nombre}</strong>"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:'p-button-danger',
      rejectButtonStyleClass:'p-button-secondary',

      accept: () => {
        this.eliminarProducto(producto.id);
      }
    })

  }

  eliminarProducto(id:number | undefined){
    if(!id) return;

    this.productoService.deleteProduct(id).subscribe({
      next: () => {

        this.exito = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto eliminado exitosamente'
        })

      },
      error: () => {
        this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el producto'
      });
      }
    })
  }

  agregarProductoAlCarrito(id:number){
    this.productoService.getProduct(id).subscribe({
      next: (data) => {
        this.carritoService.obtenerCarritoPorUsuario().subscribe({
          next: (carritoData) => {
            const productos = carritoData.Mi_Carrito_Producto || [];
            const cantidadEnElCarrito: number = productos.find((p: { idProducto: number;}) => p.idProducto === id)?.cantidad ?? 0;
            console.log('Cantidad en el carrito:', cantidadEnElCarrito);
            console.log('productos:', productos);
            if(cantidadEnElCarrito! < data.stock){
              this.carritoService.agregarProductoAlCarrito(id, { cantidad: this.cantidadSeleccionada }).subscribe({
                next: (data) => {
                  console.log('Producto agregado al carrito: ', data);
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: 'Se agrego al carrito exitosamente'
                  })
                },
                error: (error) => {
                  console.error('Error al agregar producto al carrito: ', error);
                }
              })
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Alcanzaste el stock maximo del producto en el carrito'
              });
            }
          }
        });
      }
    });
  }

  agregarAFavoritos(id:number){
    this.favoritoService.agregarAFavoritos(id).subscribe({
      next: () => {
        this.exitoFavorito = true;
        if(!this.favorito){
          this.messageService.add({
            severity: 'success',
            summary: 'Agregado',
            detail: 'Producto agregado a favoritos'
          })
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Producto eliminado de favoritos'
          })
        }
      this.favorito = !this.favorito;
      },
      error: (error) => {
        this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo agregar a favoritos'
              });
              console.log('error: ', error);
      }
    })
  }

  productoSinStockDisponible(){
    if(this.productoSeleccionado.stock === 0){
      this.sinStock = true;
    }
  }

  comprarProducto(idProducto:number){
    if(this.cantidadSeleccionada < 1 || this.cantidadSeleccionada > this.productoSeleccionado.stock){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La cantidad seleccionada excede el stock actual del producto'
      })
      return
    }
    this.compraService.comprarProducto(idProducto, this.cantidadSeleccionada).subscribe({
      next: (res: Compra) => {
        this.idCompra = res.id;
        console.log('idCompra:' + this.idCompra)
        this.compraExito = true;
        this.messageService.add({
            severity: 'success',
            summary: 'Comprado',
            detail: 'Producto comprado exitosamente'
        })
        this.redirectToVistaCompra(this.idCompra);
      },
      error: (error) => {
        console.log('Error al comprar', error)
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al comprar el producto'
        })
      }
    })
  }

  redirectToVistaCompra(idCompra:number){
    return this.routes.navigate([`compra/procesar-comprar/${idCompra}`]);
  }

}
