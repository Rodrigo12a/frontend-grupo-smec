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

  register(cotizacion: Cotizacion): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, cotizacion);
  }
}
//mysql://root:gMimNidewoBuTtAyDodFxEIRQMfhKFwr@shinkansen.proxy.rlwy.net:25181/railway
