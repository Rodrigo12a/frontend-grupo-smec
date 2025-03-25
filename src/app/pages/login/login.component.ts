import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../interfaces/login';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ErrorService } from '../../services/error.service';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_rol: number;
  nombre_usuario: string; // Añadido para el nombre
  email: string;
}

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerComponent
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email_usuario: string = '';
  password_usuario: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {}

  login() {
    if (this.email_usuario === '' || this.password_usuario === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const userLogin: Login = {
      email_usuario: this.email_usuario,
      password_usuario: this.password_usuario
    }

    this.loading = true;
    this._userService.Login(userLogin).subscribe({
      next: (token) => {
        try {
          if (typeof token !== 'string' || token.split('.').length !== 3) {
            throw new Error('Token inválido');
          }

          localStorage.setItem('token', token);
          const decoded = jwtDecode<DecodedToken>(token);

          // Mensaje de bienvenida personalizado
          const nombreUsuario = decoded.nombre_usuario || 'Usuario';
          this.toastr.success(`¡Bienvenido ${nombreUsuario}!`, 'Inicio de sesión exitoso');

          // Redirección basada en el rol
          switch (decoded.id_rol) {
            case 745:
              this.router.navigate(['/user']);
              break;
            case 125:
              this.router.navigate(['/']);
              break;
            default:
              this.router.navigate(['/']);
              // No mostramos advertencia si el rol no es crítico
          }
        } catch (error) {
          console.error('Error con el token:', error);
          localStorage.removeItem('token');
          this.toastr.error('Error al procesar credenciales');
          this.router.navigate(['/login']);
        } finally {
          this.loading = false;
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
        this.loading = false;
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
