import { Component, inject } from '@angular/core';
import { LoginService } from '../../api/services/loginService/loginService.service';
import { Router } from '@angular/router';
import { ListProductComponent } from "../../modules/products/components/list-product-component/list-product-component";

@Component({
  selector: 'app-home-component',
  imports: [ListProductComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);




}
