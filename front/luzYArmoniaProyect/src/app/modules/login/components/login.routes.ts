import { Routes } from "@angular/router";
import { LoginComponent } from "./login-component/login-component";
import { SignupComponent } from "./signup-component/signup-component";

export const loginRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'registrarse',
        component: SignupComponent
      }
    ]
  }
]
