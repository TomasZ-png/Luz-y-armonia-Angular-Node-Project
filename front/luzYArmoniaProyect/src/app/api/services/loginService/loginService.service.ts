import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class LoginService{

  http = inject(HttpClient);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  url = `${environment.api_url}usuario`

  private isBrowser = isPlatformBrowser(this.platformId);

  registrarse(data: any): Observable<any>{
    return this.http.post(`${this.url}/signup`, data);
  }

  login(data: {email:string, pass:string}): Observable<any>{
    return this.http.post(`${this.url}/login`, data)
  }

  guardarUsuarioEnSession(usuario:any){
    if(this.isBrowser){
      localStorage.setItem('USER', JSON.stringify(usuario));
    }
  }

  getUsuarioEnSession(){
    if(!this.isBrowser){
      return null;
    }
    const usuario = localStorage.getItem('USER');
    return usuario ? JSON.parse(usuario) : null;
  }

  isLoggedIn(){
    return this.getUsuarioEnSession() !== null;
  }

  logout(){
    if(this.isBrowser){
      localStorage.removeItem('USER');
    }
    this.router.navigate(['/login']);
  }
}
