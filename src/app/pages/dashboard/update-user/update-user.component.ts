import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

interface DecodedToken {
  id_usuario: number;
  nombre_usuario: string;
  ap_usuario: string;
  am_usuario: string;
  email_usuario: string;
  sexo_usuario: number | string;

}

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  updateForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm(): void {
    this.updateForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      ap_usuario: ['', Validators.required],
      am_usuario: [''],
      email_usuario: ['', [Validators.required, Validators.email]],
      telefono: [''],
      ubicacion: [''],
      biografia: ['']
    });
  }

  private loadUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        this.userId = decoded.id_usuario;
        // Actualiza el formulario con los datos decodificados
        this.updateForm.patchValue({
          nombre_usuario: decoded.nombre_usuario,
          ap_usuario: decoded.ap_usuario,
          am_usuario: decoded.am_usuario,
          email_usuario: decoded.email_usuario,
        });
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateUser(): void {
    if (this.updateForm.invalid || this.userId === null) {
      this.toastr.error('Por favor, corrige los errores en el formulario');
      return;
    }
    const updatedUser = { ...this.updateForm.value };
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        this.toastr.success('Usuario actualizado correctamente');
        // Opcional: redirigir o refrescar datos
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
        this.toastr.error('Error al actualizar el usuario');
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
