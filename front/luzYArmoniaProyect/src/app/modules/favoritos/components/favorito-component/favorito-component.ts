import { Component, inject, OnInit } from '@angular/core';
import { FavoritoService } from '../../../../api/services/favoritoService/favoritoService.service';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { environment } from '../../../../../environments/environment';
import { Producto } from '../../../products/interface/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorito-component',
  imports: [],
  templateUrl: './favorito-component.html',
  styleUrl: './favorito-component.css',
})
export class FavoritoComponent implements OnInit{

  private router = inject(Router);
  private favoritoService = inject(FavoritoService);
  private imageUrl = environment.img_url;
  favoritos: Producto[] = [];
  precioTotal: number = 0;

  ngOnInit(): void {
    this.cargarFavoritos();
    console.log(this.favoritos)
  }

  cargarFavoritos(){
    this.favoritoService.obtenerFavoritos().subscribe({
      next: (data: Producto[]) => {
        this.favoritos = data;
      },
      error: (err) => {
        console.log('Error al obtener favoritos', err);
      }
    })
  }

  getPrimerImagen(producto: Producto){
    return producto.ImagenProducto?.length ?
      this.imageUrl + producto.ImagenProducto[0].url :
      'assets/no-image.png';
  }

  eliminarProducto(id: number){
    this.favoritoService.eliminarFavoritos(id).subscribe({
      next: () => {
        this.cargarFavoritos();
      },
      error: () => {
        console.log('Error al eliminar el producto de favoritos.')
      }
    })
  }

  verProducto(id:number | undefined){
    this.router.navigate([`/producto/${id}`]);
  }

}
