import { Component } from '@angular/core';
import { CotizacionService } from '../../../services/cotizacion.service';
import { Cotizacion } from '../../../interfaces/contizacion';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.scss'
})
export class CotizacionesComponent {
  listCotizacion: Cotizacion[] = []; // Array de Cotizacion

  constructor(private _cotizacionesService: CotizacionService) { }

  ngOnInit(): void {
    this.getListCotizacion();
  }

  getListCotizacion() {
    this._cotizacionesService.getCotizacion().subscribe({
      next: (data: Cotizacion[]) => { // Asegura el tipo de respuesta
        this.listCotizacion = data;
      },
      error: (err) => {
        console.error("Error obteniendo cotizaciones:", err);
      }
    });
  }
}
