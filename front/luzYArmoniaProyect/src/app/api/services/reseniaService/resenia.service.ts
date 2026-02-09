import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Resenia } from '../../../modules/products/interface/resenia.interface';

@Injectable({
  providedIn: 'root'
})

export class ReseniaService {

  http = inject(HttpClient);
  url = `${environment.api_url}resenia`;
  router = inject(Router);

  createResenia(idProducto:number, data: {calificacion: number, comentario: string}): Observable<Resenia>{
    // const params = new HttpParams().set('id', idProducto)
    return this.http.post<Resenia>(`${this.url}/calificar/${idProducto}`, data, { withCredentials: true });
  }

  getAllReseniasFromProducts(idProduct: number): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(`${this.url}/${idProduct}`)
  }
}
