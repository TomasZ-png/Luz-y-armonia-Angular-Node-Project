import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CarritoService{

  http = inject(HttpClient);
  router = inject(Router);
  url = `${environment.api_url}carrito`;

  obtenerCarritoPorUsuario(): Observable<any>{
    // withCredentials: true envía la cookie con el JWT automáticamente
    return this.http.get(`${this.url}/`, { withCredentials: true });
  }

  agregarProductoAlCarrito(id:number, data:{cantidad:number}): Observable<any>{
    // El userId se obtiene del JWT en el servidor, no desde el cliente
    return this.http.post(`${this.url}/agregar/${id}`, data, { withCredentials: true });
  }

  eliminarProductoAlCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.url}/eliminar/${id}`, { withCredentials: true });
  }

}
