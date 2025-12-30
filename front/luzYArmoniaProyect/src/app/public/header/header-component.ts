import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../api/services/loginService/loginService.service';
import { Usuario } from '../../modules/products/interface/usuario.interface';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit{

  private loginService = inject(LoginService);
  usuario = null;
  admin = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.usuario = this.getUserSession();
    this.isAdmin();
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  getUserSession(){
    const user = this.loginService.getUsuarioEnSession();
    console.log(user);
    return user.nombre;
  }

  isAdmin(){
    const user = localStorage.getItem('USER');

    if(user){
      const userData = JSON.parse(user);
      if(userData.rol === 'ADMIN'){
        this.admin = true;
      }
    }
  }

  redirectToAgregar(){
    this.router.navigate(['producto/agregar'])
  }

  logout(){
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

}
