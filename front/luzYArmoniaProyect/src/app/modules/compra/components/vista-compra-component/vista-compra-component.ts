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

}
