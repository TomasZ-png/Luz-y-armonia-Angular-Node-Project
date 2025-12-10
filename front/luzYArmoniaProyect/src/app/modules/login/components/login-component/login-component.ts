import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  form = this.fb.group({
    correo: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)]
  })

  login(){

  }

}
