import { Component, inject, OnInit } from '@angular/core';
import { BuscarComponent } from "../../buscar-component";
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../../products/interface/product.interface';
import { ProductService } from '../../../../../api/services/productService/productService.service';
import { environment } from '../../../../../../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Button } from 'primeng/button';
import { ConfirmDialog } from "primeng/confirmdialog";
import { ListProductComponent } from "../../../../products/components/list-product-component/list-product-component";

@Component({
  selector: 'app-producto-buscado-component',
  imports: [BuscarComponent, ToastModule, ConfirmDialog, ListProductComponent],
  templateUrl: './producto-buscado-component.html',
  providers: [ConfirmationService, MessageService],
  styleUrl: './producto-buscado-component.css',
  standalone: true
})
export class ProductoBuscadoComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  valueSearch = '';
  private productService = inject(ProductService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  exito: boolean = false;
  backImageUrl = environment.img_url
  admin: boolean = false;
  productosBuscados: Producto[] = [];

  ngOnInit(): void {
    this.isAdmin();
    this.route.params.subscribe(params => {
      this.valueSearch = params['value'];
      this.cargarProductosBuscados();
    })
  }

  cargarProductosBuscados(){
    this.productService.searchProduct(this.valueSearch!).subscribe({
      next: (res) => {
        this.productosBuscados = res
      },
      error: (err) => {
        console.log(err)
      }
    }
    );
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
        this.exito = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto eliminado exitosamente'
        })
        this.router.navigate(['/home'])
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
