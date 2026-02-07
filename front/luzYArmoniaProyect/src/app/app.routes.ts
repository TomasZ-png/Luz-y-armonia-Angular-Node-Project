import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home-component';
import { AuthGuard } from './api/guards/autentication.guard';
import { NoAuthGuard } from './api/guards/noAutentication.guard';
import { MiCarritoComponent } from './modules/carrito/components/mi-carrito-component/mi-carrito-component';
import { FavoritoComponent } from './modules/favoritos/components/favorito-component/favorito-component';
import { CompraComponent } from './modules/compra/components/compra-component/compra-component';
import { BuscarComponent } from './modules/buscar-producto/components/buscar-component';
import { ProductoBuscadoComponent } from './modules/buscar-producto/components/producto-buscado/producto-buscado-component/producto-buscado-component';


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
    path: 'carrito',
    canActivate: [AuthGuard],
    component: MiCarritoComponent
  },
  {
    path: 'favoritos',
    canActivate: [AuthGuard],
    component: FavoritoComponent
  },
  {
    path: 'compra',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/compra/components/compra.routes').then(c=>c.compraRoutes)
  },
  {
    path: 'producto',
    loadChildren: () => import('./modules/products/components/product.routes').then(p=>p.productRoutes)
  },
  {
    path: 'aroma',
    loadChildren: () => import('./modules/products/components/aroma.routes').then(a=>a.aromaRoutes)
  },
  {
    path: 'buscar/:value',
    component: ProductoBuscadoComponent
  },
  {
    path: 'informacion',
    loadChildren: () => import('./modules/footer-information/components/footer-information.routes').then(fi=>fi.footer_information_routes)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];
