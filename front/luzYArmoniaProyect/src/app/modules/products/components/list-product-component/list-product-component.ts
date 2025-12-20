import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { Producto } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule, Button } from 'primeng/button';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast, ToastModule } from "primeng/toast";

@Component({
  selector: 'app-list-product-component',
  imports: [CommonModule, Button, ToastModule, ConfirmDialog],
  templateUrl: './list-product-component.html',
  styleUrl: './list-product-component.css',
  providers: [ConfirmationService, MessageService],
  standalone: true
})

export class ListProductComponent implements OnInit{
    productos: Producto[] = [];
    admin = false;
    router = inject(Router);
    backImageUrl = environment.img_url
    exito: boolean = false;
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);


  ngOnInit(){
    this.listarProductos();
    this.isAdmin();
  }

  cargando = false;
  private productService = inject(ProductService);

  listarProductos(){
    this.cargando = true;

    this.productService.getAll().subscribe({
      next: (res: Producto[]) => {
        console.log('Respuesta del backend:', res);
        this.productos = res;
        this.cargando = false;
      },
      error: (err) => {
        console.log('Error al cargar productos', err);
      }
    })
  }

    isAdmin(){
    const user = localStorage.getItem('USER');

    if(user){
      const userData = JSON.parse(user);
      if(userData.rol === 'ADMIN'){
        this.admin = true;
      }
    }
  }

  verProducto(id:number | undefined){
    this.router.navigate([`/producto/${id}`]);
  }

  redirectToUpdate(id:number | null | undefined){
    this.router.navigate([`producto/modificar/${id}`]);
  }

  getPrimerImagen(producto: Producto){
    return producto.ImagenProducto?.length ?
    this.backImageUrl + producto.ImagenProducto[0].url :
    'assets/no-image.png';
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

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.listarProductos();

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
