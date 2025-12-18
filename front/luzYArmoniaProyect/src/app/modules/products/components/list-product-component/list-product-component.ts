import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { Producto } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule, Button } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product-component',
  imports: [CommonModule, Button],
  templateUrl: './list-product-component.html',
  styleUrl: './list-product-component.css',
  standalone: true
})
export class ListProductComponent implements OnInit{
  productos: Producto[] = [];
    admin = false;
    router = inject(Router);


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

  redirectToUpdate(id:number | null | undefined){
    this.router.navigate([`producto/modificar/${id}`]);
  }


}
