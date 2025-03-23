import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { tap } from 'rxjs/operators';



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
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}register`, usuario);
   }

Login(userLogin: Login): Observable<any> {
  return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}login`, userLogin)
    .pipe(
      tap(response => {
        // Guarda el token en localStorage
        localStorage.setItem('token', response.token);
      })
    );
}

}
