import { Routes } from "@angular/router";
import { MiCarritoComponent } from "./mi-carrito-component/mi-carrito-component";

export const miCarritoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ver',
        component: MiCarritoComponent
      }
    ]
  }
]
