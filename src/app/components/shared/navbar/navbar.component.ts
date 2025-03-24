import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Instala: npm install jwt-decode

interface DecodedToken {
  nombre: string;
  apellidoP: string;
  rol?: number; // id_rol: 745 o 125, por ejemplo
  sexo_usuario: number; // 0 o 1
  // Agrega otras propiedades según tu token
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // <-- Agrega esto
    RouterLinkActive // <-- Y esto
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Corregido (antes estaba en singular)
})
export class NavbarComponent implements OnInit {
  registred: boolean = false;
  userName: string = '';
  userRole: number = 0;
  id_rol: number = 0;
  sexo_usuario: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthState();
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('token');
    this.registred = !!token;

    if (token && token.split('.').length === 3) { // Verifica que el token tenga 3 partes
      try {
        const decoded: DecodedToken = jwtDecode(token);
        this.userName = `${decoded.nombre} ${decoded.apellidoP}`;
        this.id_rol = decoded.rol ?? 0; // Si rol es undefined, asigna 0
        this.sexo_usuario = decoded.sexo_usuario;
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.registred = false;
      }
    } else {
      console.error('Token inválido o no presente');
      this.registred = false;
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.registred = false;
    this.router.navigate(['/']);
  }
}
