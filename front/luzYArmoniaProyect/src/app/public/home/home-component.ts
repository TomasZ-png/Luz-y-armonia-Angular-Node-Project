import { Component, inject,  OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  private productoService = inject(ProductService);

  productos: Producto[] = [];
  velas: Producto[] = [];
  difusores: Producto[] = [];
  recientes: Producto[] = [];
  admin: boolean = false;
  secciones: any[] = [];

  ngOnInit(): void {
    this.productoService.getAll().subscribe({
      next: (res: Producto[]) => {
        this.productos = res;
        this.velas = res.filter(x => x.Tipo_de_productos?.tipo === 'VELA' && x.estadoProducto === 'DISPONIBLE');
        this.difusores = res.filter(x => x.Tipo_de_productos?.tipo === 'DIFUSOR' && x.estadoProducto === 'DISPONIBLE');
        this.recientes = res.filter(x => this.esReciente(x) && x.estadoProducto === 'DISPONIBLE');

        this.secciones = [
          {titulo: 'Producto recientes', productos: this.recientes, tipo:'carousel'},
          {titulo: 'Velas', productos: this.velas, tipo:'carousel'},
          {titulo: 'Difusores', productos: this.difusores, tipo:'carousel'},
          {titulo: 'Todo', productos: this.productos, tipo:'grid'},
        ]
      }
    })
  }

  esReciente(producto: Producto){
    const fechaProducto = new Date(producto.fechaCreacion);
    const hoy = Date.now();

    return (hoy - fechaProducto.getTime()) <= 7 * 24 * 60 * 60 * 1000;
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

}
