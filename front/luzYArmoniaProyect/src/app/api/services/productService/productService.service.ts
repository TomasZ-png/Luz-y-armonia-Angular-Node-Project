import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Producto } from "../../../modules/products/interface/product.interface";

@Injectable({
  providedIn: 'root'
})

export class ProductService{

  http = inject(HttpClient);
  url = `${environment.api_url}producto`;
  router = inject(Router);

  getAll(): Observable<any>{
    return this.http.get(`${this.url}`);
  }

  createProduct(data:FormData): Observable<Producto>{
    return this.http.post<Producto>(`${this.url}/agregar`, data);
  }

  updateProduct(id:number, data:any): Observable<any>{
    return this.http.put(`${this.url}/modificar/${id}`, data);
  }

  deleteProduct(id:number): Observable<any>{
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

  getProduct(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/${id}`);
  }
}
