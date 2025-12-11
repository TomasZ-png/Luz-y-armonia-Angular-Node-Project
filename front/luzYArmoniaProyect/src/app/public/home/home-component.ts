import { Component, inject } from '@angular/core';
import { LoginService } from '../../api/services/loginService/loginService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);


  logout(){
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

}
