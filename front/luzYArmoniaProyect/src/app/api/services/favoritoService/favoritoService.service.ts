import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Producto } from "../../../modules/products/interface/product.interface";

@Injectable({
  providedIn: 'root'
})

export class FavoritoService {
  http = inject(HttpClient);
  router = inject(Router);
  url = `${environment.api_url}favoritos`;

  obtenerFavoritos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}`, {withCredentials: true});
  }

  agregarAFavoritos(idProducto: number){
    // body vacío; withCredentials debe pasarse como opciones
    return this.http.post(`${this.url}/agregar/${idProducto}`, null, { withCredentials: true });
  }

  eliminarFavoritos(idProducto: number){
    return this.http.delete(`${this.url}/eliminar/${idProducto}`, {withCredentials: true});
  }

}
