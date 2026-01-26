import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../../products/interface/product.interface';
import { Compra, CompraProducto } from '../../../products/interface/compra.interface';
import { environment } from '../../../../../environments/environment';
import { CompraService } from '../../../../api/services/compraService/compra.service';

@Component({
  selector: 'app-compra-component',
  imports: [],
  templateUrl: './compra-component.html',
  styleUrl: './compra-component.css',
})
export class CompraComponent implements OnInit {

  misCompras: Compra[] = [];
  private imageUrl = environment.img_url;
  private compraService = inject(CompraService);

  ngOnInit(): void {
    this.cargarMisCompras();
    console.log(this.misCompras)
  }

  cargarMisCompras(){
    this.compraService.obtenerCompras().subscribe({
      next: (data: Compra[]) => {
        this.misCompras = data;
      },
      error: (error) => {
        console.log('No se pudo cargar las compras', error);
      }
    })
  }

  getPrimerImagen(producto: Producto){
    return producto.ImagenProducto?.length ?
    this.imageUrl + producto.ImagenProducto[0].url :
    'assets/no-image.png';
  }

  formatearFecha(fecha: Date) {
    return new Date(fecha).toLocaleDateString('es-AR');
  }

}
