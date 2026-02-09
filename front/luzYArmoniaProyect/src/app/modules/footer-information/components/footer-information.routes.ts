import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us-component/about-us-component";
import { PreguntasFrecuentesComponent } from "./preguntas/preguntas-frecuentes-component/preguntas-frecuentes-component";


export const footer_information_routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sobre-nosotros',
        component: AboutUsComponent
      },
      {
        path: 'preguntas-frecuentes',
        component: PreguntasFrecuentesComponent
      },

    ]
  }
]
