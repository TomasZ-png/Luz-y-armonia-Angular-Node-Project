import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../../products/interface/product.interface';
import { Compra, CompraProducto } from '../../../products/interface/compra.interface';
import { environment } from '../../../../../environments/environment';
import { CompraService } from '../../../../api/services/compraService/compra.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  private routes = inject(Router);
  comprasOrdenadas: Compra[] = [];
  icono: string = '';
  color: string = '';
  texto: string = '';

  ngOnInit(): void {
    this.cargarMisCompras();
    console.log(this.misCompras)
  }

  cargarMisCompras(){
    this.compraService.obtenerCompras().subscribe({
      next: (data: Compra[]) => {
        this.misCompras = data;
        this.comprasOrdenadas = [...this.misCompras].sort(
          (a, b) =>
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
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

  redirectToVistaCompra(idCompra:number){
    return this.routes.navigate([`compra/procesar-comprar/${idCompra}`]);
  }

  redirectToVistaProducto(producto:Producto){
    return this.routes.navigate([`producto/${producto.id}`]);
  }

  establecerEstadoCompra(compra: Compra){
    if(compra.estado === 'PENDIENTE_PAGO'){
      this.color = 'rgb(255, 174, 0)';
      this.icono = 'history_toggle_off';
      this.texto = 'Pago pendiente';
    } else if(compra.estado === 'CANCELADA'){
      this.color = 'red';
      this.icono = 'cancel';
      this.texto = 'Cancelada';
    } else if(compra.estado === 'EXPIRADA'){
      this.color = 'rgb(114, 114, 114)';
      this.icono = 'hourglass_disabled';
      this.texto = 'Expirada';
    } else {
      this.color = 'green';
      this.icono = 'check_circle';
      this.texto = 'Pagado';
    }
  }

}
