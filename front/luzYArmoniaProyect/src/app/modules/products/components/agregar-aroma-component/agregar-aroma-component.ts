import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AromaService } from '../../../../api/services/aromaService/aroma.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-aroma-component',
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './agregar-aroma-component.html',
  styleUrl: './agregar-aroma-component.css',
})
export class AgregarAromaComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private aromaService = inject(AromaService);
  private messageService = inject(MessageService);
  error = false;
  exito= false;

  formAroma = this.fb.group ({
    aroma: ['', Validators.required]
  })

  agregarAroma(){
    if(this.formAroma.invalid){
      this.formAroma.markAllAsTouched();
      return;
    }

    const aroma = (this.formAroma.value.aroma!).toUpperCase();

    console.log('Aroma:', aroma);

    this.aromaService.create(aroma).subscribe({
      next: () => {
        this.exito = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Aroma creada exitosamente'
        })
      },
      error: () => {
        console.log('error al agregar el aroma');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear al aroma'
        })
        this.error = true;
      }
    })
  }

}
