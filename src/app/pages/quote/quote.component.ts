import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Cotizacion } from '../../interfaces/contizacion';
import {jwtDecode} from 'jwt-decode';
import { CotizacionService } from '../../services/cotizacion.service';

interface DecodedToken {
  id: number;
}

@Component({
  selector: 'app-quote',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private cotizacionService: CotizacionService ) {
    this.form = this.fb.group({
      tipo_cotizacion: ['', [Validators.required]],
      mensaje_adicional: ['', Validators.required]
    });
  }


  addCotizacion() {
    // Validar el formulario antes de enviar
    if (this.form.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const token = localStorage.getItem('token');
    let userId: number | null = null;

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        userId = decoded.id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        alert('Error de autenticación');
        return;
      }
    } else {
      alert('Debes iniciar sesión para crear una cotización');
      return;
    }

    const cotizacion: Cotizacion = {
      tipo_cotizacion: this.form.value.tipo_cotizacion,
      mensaje_adicional: this.form.value.mensaje_adicional,
      id_usuario: userId
    };

    // Usar el servicio para enviar la cotización
    this.cotizacionService.register(cotizacion).subscribe({
      next: (response) => {
        console.log('Cotización creada:', response);
        alert('Cotización creada exitosamente');
        this.form.reset();  // Limpiar el formulario
      },
      error: (err) => {
        console.error('Error al crear cotización:', err);
        alert('Error al crear la cotización');
      }
    });
  }
}
