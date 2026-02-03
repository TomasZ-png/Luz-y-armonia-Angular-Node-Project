import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../../../api/services/loginService/loginService.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink, PasswordModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit, OnDestroy{

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  error = false;
  password!: string;

  formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
    document.body.classList.add('login-page');
  }

  ngOnDestroy(): void{
    document.body.classList.remove('login-page');
  }

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
