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


  register(cotizacion: Cotizacion) {
    return this.http.post(this.myAppUrl + this.myApiUrl, {
      id_tipo_cotizacion: cotizacion.id_tipo_cotizacion,
      mensaje_adicional: cotizacion.mensaje_adicional,
      id_usuario: cotizacion.id_usuario
    });

  }

  getCotizacion(): Observable<Cotizacion[]>{
    return this.http.get<Cotizacion[]>(this.myAppUrl + this.myApiUrl,);
  }
}
