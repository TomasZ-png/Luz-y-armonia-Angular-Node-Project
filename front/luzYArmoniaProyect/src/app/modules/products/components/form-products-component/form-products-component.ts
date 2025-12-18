import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ImagenProducto, Producto } from '../../interface/product.interface';
import { Aroma } from '../../interface/aroma.interface';
import { AromaService } from '../../../../api/services/aromaService/aroma.service';
import { TipoProducto } from '../../interface/tipoProducto.interface';
import { TipoProductoService } from '../../../../api/services/tipoProductoSerive/tipoProducto.service';
import { Button } from "primeng/button";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-form-products-component',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './form-products-component.html',
  styleUrl: './form-products-component.css',
})

export class FormProductsComponent implements OnInit, OnChanges{
  @Input() producto!: Producto;
  @Input() modo: 'crear' | 'editar' = 'crear';

  @Output() submitForm = new EventEmitter<FormData>();

  aromas: Aroma[] = [];
  tiposDeProductos: TipoProducto[] = [];
  private aromaService = inject(AromaService);
  private tipoProductoService = inject(TipoProductoService)
  private fb = inject(FormBuilder);
  mostrarTamanio:boolean = false;
  imagenesExistentes: ImagenProducto[] = [];
  imagenesSeleccionadas: File[] = [];
  imagenesParaMostrar: {url:string; esNueva:boolean; id?:number, file?:File}[] = [];
  imagenesEliminadas: number[] = [];
  private backImageUrl = `${environment.img_url}`;

  formProduct = this.fb.group({
    idTipoProducto: [null as Number | null, [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    idAroma: [null as Number | null, [Validators.required]],
    precio: [null as Number | null, [Validators.required]],
    stock: [null as Number | null, [Validators.required]],
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

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['producto'] && this.modo === 'editar' && this.producto){
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

          if(this.producto.ImagenProducto){
            this.imagenesExistentes = this.producto.ImagenProducto;

            this.imagenesParaMostrar = this.producto.ImagenProducto.map(
              img => ({
                id: img.id,
                url: `${this.backImageUrl}${img.url}`,
                esNueva: false
              })
            );
          }
        }
  }

  sendProduct(){
    if(this.formProduct.invalid){
      return;
    }

    const formData = new FormData();
    const formValue = this.formProduct.value;

    Object.entries(formValue).forEach(([key, value]) => {
      if(value !== null && value !== undefined){
        formData.append(key, value.toString());
      }
    });

    this.imagenesSeleccionadas.forEach(img => {
      formData.append('imagenes', img);
    })

    console.log('FORMDATA REAL:');
      for (const e of formData.entries()) {
      console.log(e);
    }

    if(this.modo === 'crear'){
      this.formProduct.reset({
        premium:false
      })
    }

    this.mostrarTamanio = false;

    this.imagenesEliminadas.forEach(id => {
      formData.append('imagenesEliminadas[]', id.toString());
    })

    this.submitForm.emit(formData as any);
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

  isInvalid(controlFormName:string){
    const control = this.formProduct.get(controlFormName);
    return !!(control && control?.touched && control.invalid);
  }

  onImagesSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if(!input.files) return;

    const nuevasImagenes = Array.from(input.files);

    const nuevasUrls = nuevasImagenes.map(file => ({
      url: URL.createObjectURL(file),
      esNueva: true,
      file
    }));

    this.imagenesParaMostrar.push(...nuevasUrls);
    this.imagenesSeleccionadas.push(...nuevasImagenes);

    input.value = '';
  }

  eliminarImagen(index:number){
    const img = this.imagenesParaMostrar[index];

    if(!img.esNueva && img.id){
      this.imagenesEliminadas.push(img.id);
      // this.imagenesExistentes =
      //   this.imagenesExistentes.filter(i => i.id !== img.id);
    }

    if(img.esNueva && img.file){
      const idx = this.imagenesSeleccionadas.indexOf(img.file);
      if (idx !== -1) this.imagenesSeleccionadas.splice(idx, 1);
    }
    this.imagenesParaMostrar.splice(index, 1);
  }
}
