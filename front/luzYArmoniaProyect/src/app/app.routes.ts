import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home-component';
import { AuthGuard } from './api/guards/autentication.guard';
import { NoAuthGuard } from './api/guards/noAutentication.guard';


export const routes: Routes = [

  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/login/components/login.routes').then(e=>e.loginRoutes)
  },
  {
    path: 'producto',
    loadChildren: () => import('./modules/products/components/product.routes').then(p=>p.productRoutes)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];
