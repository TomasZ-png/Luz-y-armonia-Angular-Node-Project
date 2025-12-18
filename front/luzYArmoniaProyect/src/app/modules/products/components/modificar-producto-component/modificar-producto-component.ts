import { Component, inject, OnInit } from '@angular/core';
import { Toast } from "primeng/toast";
import { FormProductsComponent } from "../form-products-component/form-products-component";
import { ProductService } from '../../../../api/services/productService/productService.service';
import { MessageService } from 'primeng/api';
import { Producto } from '../../interface/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-producto-component',
  imports: [Toast, FormProductsComponent],
  templateUrl: './modificar-producto-component.html',
  styleUrl: './modificar-producto-component.css',
})
export class ModificarProductoComponent implements OnInit {

  private productoService = inject(ProductService);
  private messageService = inject(MessageService);
  productoSeleccionado!: Producto;
  router = inject(ActivatedRoute);
  exito: boolean = false;

  ngOnInit(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));

      this.productoService.getProduct(id).subscribe(producto => {
        this.productoSeleccionado = producto;
      })
  }

modificarProducto(formData: FormData){
    console.log('ENVÍO AL BACK:', formData);
    const id = Number(this.router.snapshot.paramMap.get('id'));

    this.productoService.updateProduct(id, formData).subscribe({
      next: () => {
        console.log('OK');
        this.exito = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto modificado exitosamente'
        })
      },
      error: err => {
        console.error('ERROR BACK', err);
        this.exito = false;
      }
    });
  }

}
