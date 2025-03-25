import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { map, tap } from 'rxjs/operators';



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
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, usuario);
   }

   Login(userLogin: Login): Observable<string> {  // Cambia any por string
    return this.http.post<{token: string}>(`${this.myAppUrl}${this.myApiUrl}login`, userLogin)
      .pipe(
        map(response => response.token),  // Extrae solo el token
        tap(token => {
          const tokenParts = token.split('.');
          if (tokenParts.length !== 3) {
            console.error("Token mal formado:", token);
            throw new Error('Token inválido');
          }
        })
      );
}
getUserById(userId: number): Observable<any> {
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}${userId}`);
}
updateUser(userId: number, updatedData: Partial<usuario>): Observable<any> {
  return this.http.put(`${this.myAppUrl}${this.myApiUrl}${userId}`, updatedData);
}

  }

