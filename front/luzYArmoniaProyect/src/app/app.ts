import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./public/header/header-component";
import { LoginService } from './api/services/loginService/loginService.service';
import { AdminGuard } from './api/guards/admin.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('luzYArmoniaProyect');

  private loginService = inject(LoginService);


  isLogged(){
    return this.loginService.isLoggedIn();
  }


}
