import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// Corregido: agregar posibles variantes del nombre de la propiedad
interface DecodedToken {
  nombre: string;
  apellidoP: string;
  id: number,
  rol?: number;
  sexo_usuario: number | string; // Permitir string
  sexo?: number | string; // Versión alternativa del nombre
  gender?: number | string; // Otra posible variante
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
  userRole: number = 0;
  id_rol: number = 0;
  sexo_usuario: number = 0; // Siempre numérico

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthState();
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('token');
    this.registred = !!token;

    if (token && token.split('.').length === 3) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log('Token decodificado:', decoded); // Para debug

        // Corregido: manejar diferentes nombres y tipos
        this.sexo_usuario = this.parseSexoUsuario(decoded);

        this.userName = `${decoded.nombre} ${decoded.apellidoP}`;
        this.id_rol = decoded.rol ?? 0;

      } catch (error) {
        console.error('Error decodificando token:', error);
        this.clearAuthState();
      }
    } else {
      this.clearAuthState();
    }
  }

  // Nuevo método para manejar la lógica de sexo_usuario
  private parseSexoUsuario(decoded: DecodedToken): number {
    const value = decoded.sexo_usuario ?? decoded.sexo ?? decoded.gender ?? 0;
    return Number(value); // Convertir a número
  }

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
