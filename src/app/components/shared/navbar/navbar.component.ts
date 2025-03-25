import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// Interface para decodificar el token, considerando variantes de nombres de propiedades
interface DecodedToken {
  nombre: string;
  apellidoP: string;
  id: number;
  rol?: number | string; // Puede venir como string o number
  sexo_usuario: number | string; // Permitir string
  sexo?: number | string;        // Versión alternativa
  gender?: number | string;      // Otra posible variante
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  registred: boolean = false;
  userName: string = '';
  id_rol: number = 0;
  sexo_usuario: number = 0; // Siempre numérico

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthState();
    // Ya no se realiza redirección condicional; si se necesita redirigir, se usará '/' para ambos roles.
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('token');
    this.registred = !!token;

    if (token && token.split('.').length === 3) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log('Token decodificado:', decoded);

        // Manejo de las variantes y conversión del sexo a número
        this.sexo_usuario = this.parseSexoUsuario(decoded);
        this.userName = decoded.nombre && decoded.apellidoP
                        ? `${decoded.nombre} ${decoded.apellidoP}`
                        : 'Usuario';
        // Convertir el rol a número para asegurar la comparación correcta
        this.id_rol = Number(decoded.rol) || 0;

        this.registred = true;
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.clearAuthState();
      }
    } else {
      this.clearAuthState();
    }
  }

  // Maneja las variantes de la propiedad para el sexo y lo convierte a número
  private parseSexoUsuario(decoded: DecodedToken): number {
    const value = decoded.sexo_usuario ?? decoded.sexo ?? decoded.gender ?? 0;
    return Number(value);
  }

  // Limpia el estado de autenticación
  private clearAuthState(): void {
    this.registred = false;
    this.sexo_usuario = 0;
    this.id_rol = 0;
    this.userName = '';
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.clearAuthState();
    this.router.navigate(['/']);
  }
}
