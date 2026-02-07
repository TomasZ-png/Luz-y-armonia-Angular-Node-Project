import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us-component/about-us-component";


export const footer_information_routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sobre-nosotros',
        component: AboutUsComponent
      },

    ]
  }
]
