import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../api/services/loginService/loginService.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  formSignUp = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signUp(){
    if(this.formSignUp.invalid){
      this.formSignUp.markAllAsTouched();
      return;
    }

    this.loginService.registrarse(this.formSignUp.value).subscribe({
      next: (res) => {
        this.loginService.guardarUsuarioEnSession(res.usuario);
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        console.log('Error al registrarse', error);
      }
    })
  }

  isInvalid(controlFormName:string){
    const control = this.formSignUp.get(controlFormName);
    return control?.touched && control.invalid;
  }

}
