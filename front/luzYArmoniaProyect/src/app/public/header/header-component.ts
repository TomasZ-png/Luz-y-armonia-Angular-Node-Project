import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { LoginService } from '../../api/services/loginService/loginService.service';
import { Usuario } from '../../modules/products/interface/usuario.interface';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../api/services/carritoService/carritoService.service';


@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit, OnChanges{

  private loginService = inject(LoginService);
  private carritoService = inject(CarritoService);
  usuario = null;
  admin = false;
  cantidadProductoCarrito = 0;

  private router = inject(Router);

  ngOnInit(): void {
    this.usuario = this.getUserSession();
    this.isAdmin();
    this.calcularCantidadDeProductoDelCarrito();
  }

  ngOnChanges(){
    this.calcularCantidadDeProductoDelCarrito();
  }

  calcularCantidadDeProductoDelCarrito(){
    this.carritoService.obtenerCarritoPorUsuario().subscribe({
      next: (data) => {
        this.cantidadProductoCarrito = data.Mi_Carrito_Producto.length || 0;
        console.log('cantidad: ' + this.cantidadProductoCarrito);
      }
    })
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

  isLogged(){
    return this.loginService.isLoggedIn();
  }

  redirectToAgregar(){
    this.router.navigate(['producto/agregar'])
  }

  logout(){
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

}
