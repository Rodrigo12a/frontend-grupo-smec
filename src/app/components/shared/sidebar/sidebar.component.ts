import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  nombre: string;
  apellidoP?: string;
  rol?: string;
  sexo_usuario?: number | string;
  sexo?: number | string;
  gender?: number | string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  registred: boolean = false;
  userName: string = '';
  userRole: string = '';
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
        console.log('Token sidebar:', decoded);

        this.sexo_usuario = this.parseSexoUsuario(decoded);
        this.userName = decoded.nombre + (decoded.apellidoP ? ` ${decoded.apellidoP}` : '');
        this.userRole = decoded.rol || 'Usuario';

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
    this.userName = '';
    this.userRole = '';
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.clearAuthState();
    this.router.navigate(['/login']);
  }
}
