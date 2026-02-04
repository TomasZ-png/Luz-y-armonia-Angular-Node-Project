import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { ListProductComponent } from "../../modules/products/components/list-product-component/list-product-component";
import { BuscarComponent } from "../../modules/buscar-producto/components/buscar-component";
import { Producto } from '../../modules/products/interface/product.interface';
import { ProductService } from '../../api/services/productService/productService.service';

@Component({
  selector: 'app-home-component',
  imports: [ListProductComponent, BuscarComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  private productoService = inject(ProductService);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  @Output() items = new EventEmitter<string>;

  // ngOnInit(): void {
  //   this.productoService.getAll().subscribe({
  //     next: (res) => {
  //       this.productos = res;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  // onBuscar(texto: string){
  //   const query = texto.trim().toLowerCase();

  //   if(!query){
  //     this.productosFiltrados = [...this.productos];
  //     return
  //   }

  //   this.productosFiltrados = this.productos.filter(p =>
  //     p.nombre.toLowerCase().includes(query) ||
  //     p.aroma?.aroma.toLowerCase().includes(query) ||
  //     p.tipoProducto?.tipo.toLowerCase().includes(query)
  //   )


  // }
}
