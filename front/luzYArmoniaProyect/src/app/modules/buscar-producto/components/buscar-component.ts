import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../api/services/productService/productService.service';
import { Producto } from '../../products/interface/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-buscar-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './buscar-component.html',
  standalone: true,
  styleUrl: './buscar-component.css',
})
export class BuscarComponent  {

  private productoService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private paramValue = this.route.snapshot.paramMap.get('value');

  @Output() buscar = new EventEmitter<string>();
  @Input() productos: Producto[] = [];

  items: string[] = [];
  buscarForm = this.fb.group({
    valor: [(this.paramValue)?.trim(), [Validators.required]]
  })

  onBuscar(){
    if(((this.buscarForm.get('valor')?.value)?.trim())!.length > 0){
      this.router.navigate([`/buscar/${this.buscarForm.get('valor')?.value}`])
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();

    const nombres = this.productos
      .map(p => p.nombre)
      .filter(nombre => nombre.toLowerCase().includes(query));

    // const aromas = this.productos
    //   .map(p => p.aromas?.aroma)
    //   .filter((aroma): aroma is string => !!aroma && aroma.toLowerCase().includes(query));

    this.items = Array.from(new Set([
      ...nombres,
      // ...aromas
    ]))
  }

}
