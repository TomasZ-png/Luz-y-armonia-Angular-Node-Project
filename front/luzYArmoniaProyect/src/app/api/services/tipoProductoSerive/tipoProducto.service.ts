import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoProducto } from "../../../modules/products/interface/tipoProducto.interface";

@Injectable({
  providedIn: 'root'
})

export class TipoProductoService{

  private url = `${environment.api_url}tipoProducto`;
  private http = inject(HttpClient);

  getAll(): Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>(`${this.url}`);
  }

  getbyId(id:number): Observable<TipoProducto>{
    return this.http.get<TipoProducto>(`${this.url}/${id}`);
  }
}
