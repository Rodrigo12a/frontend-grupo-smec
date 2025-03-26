import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Cotizacion } from '../interfaces/contizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { // Inyecta HttpClient
    this.myAppUrl = enviroment.endPoint; // Usa la variable corregida
    this.myApiUrl = 'api/cotizacion/';
  }


  getCotizaciones(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  updateEstado(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.myAppUrl}${this.myApiUrl}${id}`, { estado });
  }
}
