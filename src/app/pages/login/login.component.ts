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
  login(){
    //validamos que el usuario ingrese datos
    if(this.email_usuario === '' || this.password_usuario === ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }
    //creamos el body
    const userLogin: Login = {
      email_usuario: this.email_usuario,
      password_usuario: this.password_usuario
    }

    this.loading = true;
    this._userService.Login(userLogin).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/user'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
        this.loading = false;
      },
      complete: () => console.info('complete')

    })
  }


}
