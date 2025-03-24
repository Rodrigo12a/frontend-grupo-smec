import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Cotizacion } from '../../interfaces/contizacion';
import {jwtDecode} from 'jwt-decode';

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
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo_cotizacion: ['', [Validators.required]],
      mensaje_adicional: ['', Validators.required]
    });
  }


  addCotizacion() {
    // Extrae y decodifica el token para obtener el id del usuario
    const token = localStorage.getItem('token');
    let userId: number | null = null;
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        userId = decoded.id;
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }

    // Crea el objeto cotizacion, agregando el id del usuario
    const cotizacion: Cotizacion = {
      tipo_cotizacion: this.form.value.tipo_cotizacion,
      mensaje_adicional: this.form.value.mensaje_adicional,
      id_usuario: userId!  // Asegúrate de tener esta propiedad en tu interfaz Cotizacion
    };

    console.log(cotizacion);
    // Aquí puedes llamar a tu servicio para enviar la cotización al servidor
  }
}
