import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenProducto, Producto } from '../../interface/product.interface';
import { ProductService } from '../../../../api/services/productService/productService.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-view-product-component',
  imports: [],
  templateUrl: './view-product-component.html',
  styleUrl: './view-product-component.css',
})
export class ViewProductComponent implements OnInit{

private router = inject(ActivatedRoute);
private productoService = inject(ProductService);
productoSeleccionado!: Producto;
imagenesProducto: ImagenProducto[] | undefined = [];
img_url = environment.img_url;

ngOnInit(): void {
  const id = Number(this.router.snapshot.paramMap.get('id'));
  if(!id) return;

  this.productoService.getProduct(id).subscribe(producto => {
    this.productoSeleccionado = producto;
    this.imagenesProducto = producto.ImagenProducto;
  });


}

}
