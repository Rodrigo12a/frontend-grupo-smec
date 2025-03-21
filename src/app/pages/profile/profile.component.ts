import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre_usuario: ['', Validators.required],  // Nombre de usuario
      ap_usuario: ['', [Validators.required, Validators.email]],  // Agrega validación de email
      am_usuario: ['', [Validators.required, Validators.minLength(8)]],  // Agrega validación de contraseña
      email_usuario: ['', [Validators.required, Validators.email]],  // Agrega validación de email
      password_usuario: ['', [Validators.required, Validators.minLength(8)]],  // Agrega validación de contraseña de 8 caracteres
      imagen_usuario: ['', Validators.required],  // Confirmar contraseña
      sexo_usuario: ['', Validators.required]
  })
  }

  updateProfile(){
    const usuario: usuario = {
      nombre_usuario: this.form.value.nombre_usuario,
      ap_usuario: this.form.value.ap_usuario,
      am_usuario: this.form.value.am_usuario,
      email_usuario: this.form.value.email_usuario,
      password_usuario: this.form.value.password_usuario,
      imagen_usuario: this.form.value.imagen_usuario,
      sexo_usuario: this.form.value.sexo_usuario,
      estatus_usuario: 1,
      id_rol: 1
    }
    console.log(usuario);
  }
}
