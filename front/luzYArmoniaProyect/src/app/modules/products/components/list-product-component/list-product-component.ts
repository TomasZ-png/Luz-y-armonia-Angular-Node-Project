import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { Producto } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product-component',
  imports: [CommonModule],
  templateUrl: './list-product-component.html',
  styleUrl: './list-product-component.css',
  standalone: true
})
export class ListProductComponent implements OnInit{
  productos: Producto[] = [];

  ngOnInit(){
    this.listarProductos();
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

}
