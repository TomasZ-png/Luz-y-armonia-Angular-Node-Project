import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/loginService/loginService.service";

export const AdminGuard: CanActivateFn = () =>{

  const router = inject(Router);
  const loginService = inject(LoginService);

    const user = loginService.getUsuarioEnSession();

    if(user && user.rol === 'ADMIN'){
      return true;
    }
    return router.parseUrl('/home');
  }

