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
  pago_url = `${environment.api_url}pagos`;

  obtenerCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.url}`, { withCredentials:true });
  }

  obtenerCompra(idCompra: number): Observable<Compra>{
    return this.http.get<Compra>(`${this.url}/${idCompra}`, { withCredentials: true });
  }

  comprarProducto(idProducto:number, cantidad:number): Observable<Compra> {
    return this.http.post<Compra>(`${this.url}/producto/${idProducto}`, { cantidad }, { withCredentials:true });
  }

  comprarCarrito(): Observable<Compra> {
    return this.http.post<Compra>(`${this.url}/carrito`,{}, { withCredentials:true });
  }

  crearPreferenciaPago(id: number){
    return this.http.post(`${this.pago_url}/preferencia`, {id})
  }


}
