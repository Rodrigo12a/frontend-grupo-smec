import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Cotizacion } from '../../interfaces/contizacion';
import {jwtDecode} from 'jwt-decode';
import { CotizacionService } from '../../services/cotizacion.service';
import { ToastrService } from 'ngx-toastr'; // Importar Toastr
import { CommonModule } from '@angular/common';

interface DecodedToken {
  id: number;
}
interface TipoCotizacion {
  id_tipo_cotizacion: number;
  nombre_cotizacion: string;
}

@Component({
  selector: 'app-quote',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {
  form: FormGroup;

  // Opciones para el select
  tipoCotizacionOptions: TipoCotizacion[] = [
    { id_tipo_cotizacion: 1, nombre_cotizacion: 'Ingeniería Eléctrica' },
    { id_tipo_cotizacion: 2, nombre_cotizacion: 'Mantenimiento Industrial' },
    { id_tipo_cotizacion: 3, nombre_cotizacion: 'Soldadura Especializada' },
    { id_tipo_cotizacion: 4, nombre_cotizacion: 'Obras Civiles' }
  ];

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private toastr: ToastrService // Inyectar Toastr
  ) {
    this.form = this.fb.group({
      tipo_cotizacion: ['', [Validators.required]],
      mensaje_adicional: ['', Validators.required],
    });
  }

  addCotizacion() {
    if (this.form.invalid) {
      this.toastr.warning('Por favor completa todos los campos requeridos');
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
        this.toastr.error('Error de autenticación');
        return;
      }
    } else {
      this.toastr.error('Debes iniciar sesión para crear una cotización');
      return;
    }

    const cotizacion: Cotizacion = {
      tipo_cotizacion: this.form.value.tipo_cotizacion,
      mensaje_adicional: this.form.value.mensaje_adicional,
      id_usuario: userId
    };

    this.cotizacionService.register(cotizacion).subscribe({
      next: (response) => {
        this.toastr.success('Cotización creada exitosamente');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error al crear cotización:', err);
        this.toastr.error('Error al crear la cotización');
      }
    });
  }
}
