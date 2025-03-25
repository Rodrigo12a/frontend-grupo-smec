import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

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
    private toastr: ToastrService,
    private route: ActivatedRoute
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
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      console.log('ID obtenido de la URL:', this.userId); 
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe({
          next: (user) => {
            this.updateForm.patchValue({
              nombre_usuario: user.nombre_usuario,
              ap_usuario: user.ap_usuario,
              am_usuario: user.am_usuario,
              email_usuario: user.email_usuario,
              telefono: user.telefono,
              ubicacion: user.ubicacion,
              biografia: user.biografia
            });
          },
          error: (error) => {
            this.toastr.error('No se encontraron datos del usuario');
            this.router.navigate(['/usuarios']);
          }
        });
      }
    });
  }

  updateUser(): void {
    if (this.updateForm.invalid || !this.userId) {
      this.toastr.error('Por favor, completa los campos requeridos');
      return;
    }

    const updatedUser = this.updateForm.value;
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (response) => {
        this.toastr.success('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error(error.error.message || 'Error al actualizar');
      }
    });
  }
  cancelar(){
    this.router.navigate(['/usuarios'])
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
