import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../interfaces/login';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ErrorService } from '../../services/error.service';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_rol: number;
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


  constructor(private router: Router, private toastr: ToastrService,
    private _userService: UserService, private _errorService: ErrorService
  ) {}
  navigateToHome() {
    this.router.navigate(['/']); // Navega a la ruta /home
  }
  navigateToRegister() {
    this.router.navigate(['/register']); // Navega a la ruta /home
  }
  login() {
    if(this.email_usuario === '' || this.password_usuario === '') {
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
          // Verifica que el token sea un string válido
          if (typeof token !== 'string' || token.split('.').length !== 3) {
            throw new Error('Token inválido');
          }

          localStorage.setItem('token', token);
          const decoded = jwtDecode<DecodedToken>(token);

          if (decoded.id_rol === 745) {
            this.router.navigate(['/user']);
          } else if (decoded.id_rol === 125) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/']);
            this.toastr.warning('Rol de usuario no reconocido');
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


}
