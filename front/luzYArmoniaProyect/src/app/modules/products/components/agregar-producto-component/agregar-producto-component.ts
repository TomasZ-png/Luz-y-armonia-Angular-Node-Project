import { Component, inject } from '@angular/core';
import { Producto } from '../../interface/product.interface';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { FormProductsComponent } from "../form-products-component/form-products-component";

@Component({
  selector: 'app-agregar-producto-component',
  imports: [FormProductsComponent],
  templateUrl: './agregar-producto-component.html',
  styleUrl: './agregar-producto-component.css',
})
export class AgregarProductoComponent {

  private productoService = inject(ProductService);
  exito: boolean = false;

  crearProducto(producto: Producto){
  console.log('ENVÍO AL BACK:', producto);

  this.productoService.createProduct(producto).subscribe({
    next: () => {
      console.log('OK');
      this.exito = true;
    },
    error: err => {
      console.error('ERROR BACK', err);
      this.exito = false;
    }
  });  }

}
