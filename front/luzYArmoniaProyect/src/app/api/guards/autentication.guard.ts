import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/loginService/loginService.service";

export const AuthGuard: CanActivateFn = () => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.isLoggedIn() ? true : router.createUrlTree(['/login']);
}
