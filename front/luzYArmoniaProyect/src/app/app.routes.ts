import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home-component';
import { AuthGuard } from './api/guards/autentication.guard';
import { NoAuthGuard } from './api/guards/noAutentication.guard';


export const routes: Routes = [

  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/login/components/login.routes').then(e=>e.loginRoutes)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];
