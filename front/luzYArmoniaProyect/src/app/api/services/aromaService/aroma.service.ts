import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Aroma } from "../../../modules/products/interface/aroma.interface";

@Injectable({
  providedIn: 'root'
})

export class AromaService{

  private url = `${environment.api_url}aroma`;
  private http = inject(HttpClient);

  getAll(): Observable<Aroma[]>{
    return this.http.get<Aroma[]>(`${this.url}`);
  }

  create(aroma:string): Observable<any>{
    return this.http.post(`${this.url}/agregar`, { aroma });
  }

  delete(id:number): Observable<Aroma>{
    return this.http.delete<Aroma>(`${this.url}/eliminar/${id}`);
  }
}
