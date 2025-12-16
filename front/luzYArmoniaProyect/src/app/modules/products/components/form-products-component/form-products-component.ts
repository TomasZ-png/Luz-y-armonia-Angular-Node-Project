import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Producto } from '../../interface/product.interface';
import { Aroma } from '../../interface/aroma.interface';
import { AromaService } from '../../../../api/services/aromaService/aroma.service';
import { TipoProducto } from '../../interface/tipoProducto.interface';
import { TipoProductoService } from '../../../../api/services/tipoProductoSerive/tipoProducto.service';

@Component({
  selector: 'app-form-products-component',
  imports: [ReactiveFormsModule],
  templateUrl: './form-products-component.html',
  styleUrl: './form-products-component.css',
})
export class FormProductsComponent implements OnInit{
  @Input() producto!: Producto;
  @Input() modo: 'crear' | 'editar' = 'crear';

  @Output() submitForm = new EventEmitter<Producto>();

  aromas: Aroma[] = [];
  tiposDeProductos: TipoProducto[] = [];
  private aromaService = inject(AromaService);
  private tipoProductoService = inject(TipoProductoService)
  private fb = inject(FormBuilder);
  mostrarTamanio:boolean = false;

  formProduct = this.fb.group({
    idTipoProducto: [0, [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    idAroma: [0, [Validators.required]],
    precio: [0, [Validators.required]],
    stock: [0, [Validators.required]],
    alto: [null as Number | null],
    ancho: [null as Number | null],
    mililitros: [null as Number | null],
    premium: [false, [Validators.required]]
  })

  ngOnInit(): void {
      this.aromaService.getAll().subscribe((data: Aroma[]) => {
        this.aromas = data;
      })

      this.tipoProductoService.getAll().subscribe((data: TipoProducto[]) => {
        this.tiposDeProductos = data;

        if(this.modo === 'editar'){
          this.formProduct.patchValue({
            nombre: this.producto.nombre,
            descripcion: this.producto.descripcion,
            idAroma: this.producto.idAroma,
            precio: this.producto.precio,
            stock: this.producto.stock,
            alto: this.producto.alto,
            ancho: this.producto.ancho,
            mililitros: this.producto.mililitros,
            premium: this.producto.premium,
            idTipoProducto: this.producto.idTipoProducto
          })
        }
      })

      this.formProduct.get('idTipoProducto')?.valueChanges.subscribe(id => {

        if(!id) return;

        const idNumber = Number(id);

        const tipoProductoElegido = this.tiposDeProductos.find(tp => tp.id === idNumber)

        if(!tipoProductoElegido) return;

        if(tipoProductoElegido.tipo === 'VELA'){
          this.activarTamanio();
          this.mostrarTamanio = true;
        } else {
          this.activarMililitros();
          this.mostrarTamanio = false;
        }
      })
  }

  sendProduct(){
    if(this.formProduct.invalid){
      return;
    }

    const formValue = this.formProduct.value;

    const product: Producto = {
      ...formValue,
      idTipoProducto: Number(formValue.idTipoProducto)
    } as Producto;

    this.submitForm.emit(product);
  }

  activarTamanio(){
    this.formProduct.get('alto')?.setValidators([Validators.required]);
    this.formProduct.get('ancho')?.setValidators([Validators.required]);
    this.formProduct.get('mililitros')?.clearValidators();

    this.formProduct.get('mililitros')?.reset(null);

    this.actualizarValidaciones();
  }

  activarMililitros(){
    this.formProduct.get('mililitros')?.setValidators([Validators.required]);
    this.formProduct.get('alto')?.clearValidators();
    this.formProduct.get('ancho')?.clearValidators();

    this.formProduct.get('alto')?.reset(null);
    this.formProduct.get('ancho')?.reset(null);

    this.actualizarValidaciones();
  }

  actualizarValidaciones(){
    this.formProduct.get('alto')?.updateValueAndValidity();
    this.formProduct.get('ancho')?.updateValueAndValidity();
    this.formProduct.get('mililitros')?.updateValueAndValidity();
  }

}
