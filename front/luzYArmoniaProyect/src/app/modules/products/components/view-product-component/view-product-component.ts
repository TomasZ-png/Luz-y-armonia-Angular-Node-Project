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

@Component({
  selector: 'app-view-product-component',
  imports: [Button, Toast, ConfirmDialog],
  templateUrl: './view-product-component.html',
  styleUrl: './view-product-component.css',
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
private confirmationService = inject(ConfirmationService);
private messageService = inject(MessageService);

ngOnInit(): void {
  const id = Number(this.router.snapshot.paramMap.get('id'));
  if(!id) return;

  this.productoService.getProduct(id).subscribe(producto => {
    this.productoSeleccionado = producto;
    this.imagenesProducto = producto.ImagenProducto;
    this.imagenSeleccionada = this.imagenesProducto?.[0] || null;
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

}
