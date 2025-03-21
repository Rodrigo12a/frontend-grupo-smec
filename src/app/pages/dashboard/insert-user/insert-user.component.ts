import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usuario } from '../../../interfaces/usuario';
import { UserService } from '../../../services/landing.service';
import { UserCrudService } from '../../../services/user-crud.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-insert-user',
  imports: [SidebarComponent, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.scss'
})
export class InsertUserComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor( private fb: FormBuilder ,private router: Router, private _userService: UserCrudService, private toastr : ToastrService, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre_usuario: ['', Validators.required],
      ap_usuario: ['', Validators.required],
      am_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],  // Agrega validación de email
      password_usuario: ['', [Validators.required, Validators.minLength(8)]],
      confirmar_password_usuario: ['', Validators.required],
      sexo_usuario: ['', Validators.required],
      id_rol: ['', Validators.required],  // Nombre debe coincidir con formControlName
      estatus_usuario: ['', Validators.required]  // Valor inicial "Activo"
    }, {
      validators: this.passwordMatchValidator  // Validador personalizado para contraseñas
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.operacion = 'Editar';
      this.getUsuario(this.id);
      //this._userService.getUsuario(this.id).subscribe((usuario) => {
      //this.form.patchValue(usuario);
      //this.imagenPreview = usuario.imagen_usuario;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password_usuario')?.value;
    const confirmPassword = form.get('confirmar_password_usuario')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  // Previsualización de imagen
imagenPreview: string | ArrayBuffer | null = null;

onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagenPreview = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
navigateToUsers(){
  this.router.navigate(['/user']);
}

addUser() {
  console.log(this.form.value);

  const usuario: usuario = {
    nombre_usuario: this.form.value.nombre_usuario,
    ap_usuario: this.form.value.ap_usuario,
    am_usuario: this.form.value.am_usuario,
    email_usuario: this.form.value.email_usuario,
    password_usuario: this.form.value.password_usuario,
    sexo_usuario: this.form.value.sexo_usuario,
    id_rol: this.form.value.id_rol,
    estatus_usuario: this.form.value.estatus_usuario,
    imagen_usuario: this.imagenPreview ? this.imagenPreview.toString() : null
  };

  this.loading = true;

  if (this.id && this.id !== 0) {
    this._userService.updateUsuario(this.id, usuario).subscribe(
      () => {
        this.loading = false;
        this.toastr.success(`Usuario ${usuario.nombre_usuario} actualizado`, 'Usuario Actualizado!');
        console.log('✅ Usuario actualizado correctamente');
        this.router.navigate(['/user']);
      },
      error => {
        this.loading = false;
        console.error('❌ Error al actualizar el usuario:', error);
        this.toastr.error('Error al actualizar el usuario.', 'Error');
      }
    );
  } else {
    this._userService.saveUsuario(usuario).subscribe(
      () => {
        this.loading = false;
        this.toastr.success(`Usuario ${usuario.nombre_usuario} guardado`, 'Usuario Registrado!');
        console.log('✅ Usuario guardado correctamente');
        this.router.navigate(['/user']);
      },
      error => {
        this.loading = false;
        console.error('❌ Error al guardar el usuario:', error);
        this.toastr.error('Error al registrar el usuario.', 'Error');
      }
    );
  }
}

getUsuario(id: number): void {
  this.loading = true;
  this._userService.getUsuario(id).subscribe(
    (data: any) => {
      this.loading = false;
      console.log("Respuesta del backend:", data);

      if (!data.usuario) {
        this.toastr.error('No se encontraron datos del usuario.', 'Error');
        return;
      }

      const usuarioData = data.usuario;

      this.form.patchValue({
        nombre_usuario: usuarioData.nombre_usuario || '',
        ap_usuario: usuarioData.ap_usuario || '',
        am_usuario: usuarioData.am_usuario || '',
        email_usuario: usuarioData.email_usuario || '',
        password_usuario: '', // No mostrar la contraseña
        confirmar_password_usuario: '', // No mostrar confirmación de contraseña
        sexo_usuario: usuarioData.sexo_usuario || '',
        id_rol: usuarioData.id_rol || '',
        estatus_usuario: usuarioData.estatus_usuario || ''
      });

      this.imagenPreview = usuarioData.imagen_usuario ? usuarioData.imagen_usuario : null;
    },
    error => {
      this.loading = false;
      console.error("Error al obtener el usuario:", error);
      this.toastr.error('Error al obtener el usuario.', 'Error');
    }
  );
}
}
