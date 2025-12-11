import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

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

}
