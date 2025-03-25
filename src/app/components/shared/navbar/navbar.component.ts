import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  email: string;
  nombre: string;
  apellidoP: string;
  apellidoM?: string;
  rol: number;
  sexo: number;
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
  isAuthenticated: boolean = false;
  userName: string = '';
  userEmail: string = '';
  userRole: number = 0;
  userGender: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthState();
    // Escuchar cambios en localStorage
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.checkAuthState();
      }
    });
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.clearAuthState();
      return;
    }

    // Verificar formato básico del token JWT
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('Formato de token inválido');
      this.clearAuthState();
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      // Validar estructura mínima del token decodificado
      if (!decoded.id || !decoded.email || !decoded.nombre) {
        throw new Error('Token no contiene los campos requeridos');
      }

      this.isAuthenticated = true;
      this.userName = `${decoded.nombre} ${decoded.apellidoP}`;
      this.userEmail = decoded.email;
      this.userRole = decoded.rol || 0;
      this.userGender = decoded.sexo || 0;

    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.clearAuthState();
      localStorage.removeItem('token'); // Limpiar token inválido
    }
  }

  private clearAuthState(): void {
    this.isAuthenticated = false;
    this.userName = '';
    this.userEmail = '';
    this.userRole = 0;
    this.userGender = 0;
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.clearAuthState();
    this.router.navigate(['/']);
  }
}
