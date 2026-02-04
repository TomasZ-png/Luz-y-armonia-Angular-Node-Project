import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { ProductService } from '../../../api/services/productService/productService.service';
import { ButtonDirective } from "primeng/button";
import { Producto } from '../../products/interface/product.interface';
import { Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-buscar-component',
  imports: [AutoComplete, FormsModule, ButtonDirective],
  templateUrl: './buscar-component.html',
  standalone: true,
  styleUrl: './buscar-component.css',
})
export class BuscarComponent {

  private productoService = inject(ProductService);
  private router = inject(Router);

  @Output() buscar = new EventEmitter<string>();
  @Input() productos: Producto[] = [];

  items: string[] = [];
  valor: string = '';

  onBuscar(){
    this.router.navigate([`/buscar/${this.valor}`])
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();

    const nombres = this.productos
      .map(p => p.nombre)
      .filter(nombre => nombre.toLowerCase().includes(query));

    const aromas = this.productos
      .map(p => p.aroma?.aroma)
      .filter((aroma): aroma is string => !!aroma && aroma.toLowerCase().includes(query));

    this.items = Array.from(new Set([
      ...nombres,
      ...aromas
    ]))
  }

}
