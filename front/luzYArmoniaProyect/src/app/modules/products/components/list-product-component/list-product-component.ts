import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { Producto } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule, Button } from 'primeng/button';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast, ToastModule } from "primeng/toast";
import { CarritoService } from '../../../../api/services/carritoService/carritoService.service';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-list-product-component',
  imports: [CommonModule, Button, ToastModule, ConfirmDialog, CarouselModule, TagModule, ButtonModule],
  templateUrl: './list-product-component.html',
  styleUrl: './list-product-component.css',
  providers: [ConfirmationService, MessageService],
  standalone: true
})

export class ListProductComponent implements OnInit{
    router = inject(Router);
    backImageUrl = environment.img_url
    exito: boolean = false;
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private productService = inject(ProductService);
    responsiveOptions: any[] | undefined;

    @Input() titulo: string = '';
    @Input() productos: Producto[] = [];
    @Input() tipo: 'carousel' | 'grid' = 'grid';
    @Input() admin: boolean = false;

  ngOnInit(){
    this.responsiveOptions = [
            {
                breakpoint: '1300px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '690px',
                numVisible: 2,
                numScroll: 1
            },

        ];
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


