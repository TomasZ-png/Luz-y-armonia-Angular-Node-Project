import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {

  private router = inject(Router);

  goToInstagram() {
    window.open('https://www.instagram.com/luz_.y._armonia/', '_blank');
  }

  goToWhatsApp() {
    window.open('https://wa.me/1121931336', '_blank');
  }

  goToFacebook() {
    window.open('https://www.facebook.com/mariela.nadin', '_blank');
  }

  goToAboutUs() {
    this.router.navigate(['/informacion/sobre-nosotros']);
  }

}
