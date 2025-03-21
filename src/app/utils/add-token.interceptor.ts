import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service'; // Línea 4 corregida
import { Router } from '@angular/router';

export const addTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const errorService = inject(ErrorService); // Inyecta el servicio
  const router = inject(Router); // Para redirección Angular

  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          errorService.msgError(error);
          router.navigate(['/login']); // Redirección Angular
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
