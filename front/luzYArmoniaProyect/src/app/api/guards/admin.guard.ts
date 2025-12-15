import { inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

export class AdminGuard implements CanActivate{

  private router = inject(Router);

  canActivate():boolean{
    const user = localStorage.getItem('USER');

    if(user){
      const userData = JSON.parse(user);
      if(userData.rol === 'ADMIN'){
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
