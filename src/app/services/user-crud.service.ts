import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { enviroment } from '../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = enviroment.endPoint;
    this.myApiUrl = 'api/user/';
  }
  getListUsuarios(): Observable<usuario[]> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      map(response => response.listaUsuarios) // Extrae el array listaUsuarios
    );
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveUsuario(usuario: usuario): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }

  getUsuario(id: number): Observable<usuario> {
    return this.http.get<usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateUsuario(id: number, usuario: usuario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario);
  }

}
