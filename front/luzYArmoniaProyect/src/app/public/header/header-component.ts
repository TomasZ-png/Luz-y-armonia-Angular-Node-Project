import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../api/services/loginService/loginService.service';
import { Usuario } from '../../modules/products/interface/usuario.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit{

  private loginService = inject(LoginService);
  usuario = null;

  private router = inject(Router);

  ngOnInit(): void {
    this.usuario = this.getUserSession();
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  getUserSession(){
    const user = this.loginService.getUsuarioEnSession();
    console.log(user);
    return user.nombre;
  }
}
