import { Routes } from "@angular/router";
import { AdminGuard } from "../../../api/guards/admin.guard";
import { AgregarAromaComponent } from "./agregar-aroma-component/agregar-aroma-component";

export const aromaRoutes: Routes = [{
  path: '',
  children: [
    {
      path: 'agregar',
      canActivate: [AdminGuard],
      component: AgregarAromaComponent
    }
  ]
}]
