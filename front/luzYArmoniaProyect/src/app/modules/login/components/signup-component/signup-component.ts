import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../api/services/loginService/loginService.service';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule, RouterLink, PasswordModule, FormsModule],
  templateUrl: './signup-component.html',
  standalone: true,
  styleUrl: './signup-component.css',
})
export class SignupComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  password!: string;

  formSignUp = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
    document.body.classList.add('login-page');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-page');
  }


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
