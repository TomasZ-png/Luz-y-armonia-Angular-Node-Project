import { Component, inject } from '@angular/core';
import { Producto } from '../../interface/product.interface';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { FormProductsComponent } from "../form-products-component/form-products-component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-producto-component',
  imports: [FormProductsComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './agregar-producto-component.html',
  styleUrl: './agregar-producto-component.css',
})
export class AgregarProductoComponent {

  private productoService = inject(ProductService);
  private messageService = inject(MessageService);
  exito: boolean = false;

  crearProducto(formData: FormData){
    console.log('ENVÍO AL BACK:', formData);

    this.productoService.createProduct(formData).subscribe({
      next: () => {
        console.log('OK');
        this.exito = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto creado exitosamente'
        })
      },
      error: err => {
        console.error('ERROR BACK', err);
        this.exito = false;
      }
    });
  }

}
