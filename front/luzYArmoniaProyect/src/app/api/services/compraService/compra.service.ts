import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Compra, CompraProducto } from "../../../modules/products/interface/compra.interface";

@Injectable({
  providedIn: 'root'
})

export class CompraService{
  http = inject(HttpClient);
  router = inject(Router);
  url = `${environment.api_url}compra`;

  obtenerCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.url}`, { withCredentials:true });
  }

  comprarProducto(idProducto:number, cantidad:number): Observable<CompraProducto> {
    return this.http.post<CompraProducto>(`${this.url}/producto/${idProducto}`, { cantidad }, { withCredentials:true });
  }

  comprarCarrito(): Observable<CompraProducto[]> {
    return this.http.post<CompraProducto[]>(`${this.url}/carrito`,{}, { withCredentials:true });
  }

}
