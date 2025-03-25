import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_rol: number; 
  nombre: string;
  apellidoP: string;
  sexo_usuario: number | string;
  sexo?: number | string;
  gender?: number | string;
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
  sexo_usuario: number = 0;

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

        // Asegurar que id_rol sea numérico
        this.id_rol = Number(decoded.id_rol) || 0;

        this.sexo_usuario = this.parseSexoUsuario(decoded);
        this.userName = `${decoded.nombre} ${decoded.apellidoP}`;

      } catch (error) {
        console.error('Error decodificando token:', error);
        this.clearAuthState();
      }
    } else {
      this.clearAuthState();
    }
  }

  private parseSexoUsuario(decoded: DecodedToken): number {
    const value = decoded.sexo_usuario ?? decoded.sexo ?? decoded.gender ?? 0;
    return Number(value);
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
