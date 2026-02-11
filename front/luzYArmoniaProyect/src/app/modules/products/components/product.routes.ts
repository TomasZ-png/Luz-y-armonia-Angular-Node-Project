import { Routes, CanActivate } from '@angular/router';
import { AgregarProductoComponent } from "./agregar-producto-component/agregar-producto-component";
import { ModificarProductoComponent } from "./modificar-producto-component/modificar-producto-component";
import { AdminGuard } from "../../../api/guards/admin.guard";
import { AuthGuard } from '../../../api/guards/autentication.guard';
import { ViewProductComponent } from './view-product-component/view-product-component';

export const productRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AgregarProductoComponent
      },
      {
        path: 'modificar/:id',
        canActivate: [AdminGuard],
        component: ModificarProductoComponent
      },
      {
        path: ':id',
        component: ViewProductComponent
      }
    ]
  }
]
