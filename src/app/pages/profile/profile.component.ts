import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DecodedToken {
  nombre_usuario: string;
  ap_usuario: string;
  am_usuario?: string;
  email_usuario: string;
  sexo_usuario: number | string;
  // Otras propiedades del token, si las hay
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  sexo_usuario: number = 0;
  avatarUrl: string = 'assets/images/avatars/avatar-01.svg';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      ap_usuario: ['', Validators.required],
      am_usuario: [''],
      email_usuario: ['', [Validators.required, Validators.email]],
      sexo_usuario: ['', Validators.required]
    });
  }

  private loadUserData(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Verificar y asignar un valor predeterminado si sexo_usuario es undefined o null
        const sexoValue = (decoded.sexo_usuario !== undefined && decoded.sexo_usuario !== null)
          ? decoded.sexo_usuario.toString()
          : '0';

        this.sexo_usuario = Number(sexoValue);
        this.avatarUrl = this.sexo_usuario === 0
          ? 'assets/images/avatars/avatar-02.svg'
          : 'assets/images/avatars/avatar-01.svg';

        // Llenar formulario con los datos decodificados
        this.profileForm.patchValue({
          nombre_usuario: decoded.nombre_usuario,
          ap_usuario: decoded.ap_usuario,
          am_usuario: decoded.am_usuario || '',
          email_usuario: decoded.email_usuario,
          sexo_usuario: sexoValue
        });
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.router.navigate(['/login']);
      }
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      // Aquí iría la lógica para actualizar el perfil
      console.log('Datos actualizados:', this.profileForm.value);
      alert('Perfil actualizado correctamente');
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
