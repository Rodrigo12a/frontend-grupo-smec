import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DecodedToken {
  // Especifica las propiedades conocidas como opcionales
  nombre?: string;
  nombre_usuario?: string;
  apellidoP?: string;
  ap_usuario?: string;
  apellidoM?: string;
  am_usuario?: string;
  email?: string;
  email_usuario?: string;
  sexo_usuario?: number | string;
  sexo?: number | string;
  gender?: number | string;
  [key: string]: any; // Firma de índice
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
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

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log('Token decodificado:', decoded); // Para depuración

      // Manejo seguro de propiedades
      const sexo = this.parseSexo(decoded);
      this.avatarUrl = sexo === 0
        ? 'assets/images/avatars/avatar-02.svg'
        : 'assets/images/avatars/avatar-01.svg';

      this.profileForm.patchValue({
        nombre_usuario: decoded.nombre || decoded.nombre_usuario || '',
        ap_usuario: decoded.apellidoP || decoded.ap_usuario || '',
        am_usuario: decoded.apellidoM || decoded.am_usuario || '',
        email_usuario: decoded.email || decoded.email_usuario || '',
        sexo_usuario: sexo.toString()
      });

    } catch (error) {
      console.error('Error decodificando token:', error);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  private parseSexo(decoded: DecodedToken): number {
    const sexoValue = decoded.sexo_usuario ?? decoded.sexo ?? decoded.gender ?? 1;
    return Number(sexoValue) || 1; // Valor por defecto: Masculino
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      console.log('Datos a actualizar:', this.profileForm.value);
      // Lógica para actualizar el perfil
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
