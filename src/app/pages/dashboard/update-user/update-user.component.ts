import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ReactiveFormsModule
  ],
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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private initializeForm(): void {
    this.updateForm = this.fb.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(2)]],
      ap_usuario: ['', [Validators.required, Validators.minLength(2)]],
      am_usuario: [''],
      email_usuario: ['', [Validators.required, Validators.email]],
      telefono: [''],
      ubicacion: [''],
      biografia: ['']
    });
  }

  private loadUserData(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe({
          next: (response) => {
            const user = response.usuario || response;

            this.updateForm.patchValue({
              nombre_usuario: user.nombre_usuario || '',
              ap_usuario: user.ap_usuario || '',
              am_usuario: user.am_usuario || '',
              email_usuario: user.email_usuario || '',
              telefono: user.telefono || '',
              ubicacion: user.ubicacion || '',
              biografia: user.biografia || ''
            });
          },
          error: (error) => {
            console.error('Error al cargar datos de usuario:', error);
            this.toastr.error('No se pudieron cargar los datos del usuario');
            this.router.navigate(['/usuarios']);
          }
        });
      }
    });
  }

  updateUser(): void {
    if (this.updateForm.invalid || !this.userId) {
      this.toastr.error('Por favor, completa los campos requeridos correctamente');
      return;
    }

    const updatedUser = this.updateForm.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        this.toastr.success('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        this.toastr.error(error.error?.message || 'Error al actualizar usuario');
      }
    });
  }

  // Métodos para manejar validaciones en el template
  isFieldInvalid(controlName: string): boolean {
    const control = this.updateForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.updateForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (control.errors['minlength']) {
        return 'El campo es demasiado corto';
      }
    }
    return '';
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
