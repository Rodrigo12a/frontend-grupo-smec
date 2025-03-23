import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient ) {
    this.myAppUrl = enviroment.endPoint;
    this.myApiUrl = 'api/user/';
   }

   register(usuario: usuario): Observable<any>{
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}login`, usuario);
   }

   Login(userLogin: Login): Observable<string> {
      return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, userLogin);
   }
}
