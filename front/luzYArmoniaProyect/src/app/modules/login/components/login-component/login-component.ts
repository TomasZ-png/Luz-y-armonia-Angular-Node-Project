import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../../../api/services/loginService/loginService.service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  error = false;

  formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  login(){

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    }

    const data = {
      correo: this.formLogin.value.correo!,
      password: this.formLogin.value.password!
    }

    this.loginService.login(data).subscribe({
      next: (res) => {
        this.loginService.guardarUsuarioEnSession(res.usuario);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('error al loguearse', err);
        this.error = true;
      }
    })
  }

}
