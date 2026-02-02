import { CompraComponent } from './compra-component/compra-component';
import { VistaCompraComponent } from './vista-compra-component/vista-compra-component';
import { Routes } from "@angular/router";

export const compraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompraComponent
      },
      {
        path: 'procesar-comprar/:id',
        component: VistaCompraComponent
      }
    ]
  }
]
