import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { usuario } from '../../interfaces/usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({

  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerComponent
],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  estatus_usuario: number = 0;
  nombre_usuario: string = '';
  ap_usuario: string = '';
  am_usuario: string ='';
  sexo_usuario: number | null = null;
  email_usuario: string ='';
  password_usuario: string = '';
  confirmarP_usuario: string = '';
  imagen_usuario: string | null= null;
  id_rol: number | null = null;
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService){

  }
  addUser(){
    //validamos el usuario ingrese valores
    if (
      this.nombre_usuario === '' ||
      this.ap_usuario === '' ||
      this.am_usuario === '' ||
      this.email_usuario === '' ||
      this.password_usuario === '' ||
      this.confirmarP_usuario === ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //validamos que los password sean iguales
    if(this.password_usuario != this.confirmarP_usuario){
      this.toastr.error('Las contraseñas no son iguales', 'Error');
      return;
    }

    //creamos el objeto
    const usuario: usuario = {
      estatus_usuario: 0,
    nombre_usuario: this.nombre_usuario,
    ap_usuario: this.ap_usuario,
    am_usuario: this.am_usuario,
    sexo_usuario: null,
    email_usuario: this.email_usuario,
    password_usuario: this.password_usuario,
    imagen_usuario:  null,
    id_rol: null
    }

    this.loading = true;
    this._userService.register(usuario).subscribe({
      next: (v) => {
        this.loading = false;
        console.log('el usuario fue registrado con exito');
        this.toastr.success('el usuario fue registrado con exito','Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msgError(e);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }
}
