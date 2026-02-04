import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./public/header/header-component";
import { LoginService } from './api/services/loginService/loginService.service';
import { AdminGuard } from './api/guards/admin.guard';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FooterComponent } from "./public/footer/footer-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastModule, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [MessageService]
})
export class App {
  protected readonly title = signal('luzYArmoniaProyect');

  private loginService = inject(LoginService);


  isLogged(){
    return this.loginService.isLoggedIn();
  }


}
