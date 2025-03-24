import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Instala: npm install jwt-decode


interface DecodedToken {
  nombre: string;
  apellidoP: string;
  rol?: string;
  // Agrega otras propiedades según tu token
}

@Component({
  selector: 'app-navbar',
  standalone: true, // <-- Si es standalone
  imports: [
    CommonModule,
    RouterLink,      // <-- Agrega esto
    RouterLinkActive // <-- Y esto
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  registred: boolean = true;
  userName: string = '';
  userRole: string = '';

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
        this.userRole = decoded.rol || 'Usuario' ; // Valor por defecto
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.logOut();
      }
    } else {
      console.error('Token inválido o no presente');
      this.logOut();
    }
  }


  logOut(): void {
    localStorage.removeItem('token');
    this.registred = false;
    this.router.navigate(['/']);
  }
}
