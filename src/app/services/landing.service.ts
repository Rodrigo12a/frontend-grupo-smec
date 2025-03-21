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
    this.myApiUrl = 'landing';
   }

   getUsuarios(): Observable<usuario[]>{
      return this.http.get<usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   Login(userLogin: Login): Observable<string> {
      return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, userLogin);
   }
}
