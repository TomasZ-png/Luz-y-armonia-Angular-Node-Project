import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../../../api/services/compraService/compra.service';
import { Compra } from '../../../products/interface/compra.interface';
import { Producto } from '../../../products/interface/product.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-vista-compra-component',
  imports: [],
  templateUrl: './vista-compra-component.html',
  styleUrl: './vista-compra-component.css',
})
export class VistaCompraComponent implements OnInit{

  private router = inject(ActivatedRoute);
  private compraService = inject(CompraService);
  private idCompra = Number(this.router.snapshot.paramMap.get('id'));
  backImageUrl = environment.img_url;
  pagoPendiente: boolean = false;
  compra!: Compra;
  icono: string = '';
  color: string = '';
  texto: string = '';

  ngOnInit(){
    this.cargarCompra(this.idCompra);
  }

  cargarCompra(idCompra: number){
    this.compraService.obtenerCompra(idCompra).subscribe({
      next: (res: Compra) => {
        this.compra = res;
        if(this.compra.estado === 'PENDIENTE_PAGO' || this.compra.estado === 'CREADA'){
          this.pagoPendiente = true;
        }
        this.establecerEstadoCompra();
        console.log(this.pagoPendiente)
      },
      error: (error: any) => {
        console.log(error.message)
      },
    })
  }

  formatearFecha(fecha: Date) {
    return new Date(fecha).toLocaleDateString('es-AR');
  }

  getPrimerImagen(producto: Producto){
    return producto.ImagenProducto?.length ?
    this.backImageUrl + producto.ImagenProducto[0].url :
    'assets/no-image.png';
  }

  pagar(){
    this.compraService.crearPreferenciaPago(this.idCompra).subscribe({
      next: (res:any) => {
        window.location.href = res.initPoint;
      },
      error: (err) => {
        console.error('Error al iniciar pago', err);
      }
    })
  }

  establecerEstadoCompra(){
    if(this.compra.estado === 'PENDIENTE_PAGO'){
      this.color = 'rgb(255, 174, 0)';
      this.icono = 'history_toggle_off';
      this.texto = 'Pago pendiente';
    } else if(this.compra.estado === 'CANCELADA'){
      this.color = 'red';
      this.icono = 'cancel';
      this.texto = 'Cancelada';
    } else if(this.compra.estado === 'EXPIRADA'){
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
