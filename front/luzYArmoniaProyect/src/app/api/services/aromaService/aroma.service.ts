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
}
