import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient ) {
    this.myAppUrl = enviroment.endPoint;
    this.myApiUrl = 'api/auth/user';
   }


   getUsuarios(): Observable<usuario[]>{

    /*
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('authorization',`Bearer ${token}`)
    return this.http.get<usuario[]>(`${this.myAppUrl}${this.myApiUrl}`,{headers: headers});
    */
    return this.http.get<usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
}
