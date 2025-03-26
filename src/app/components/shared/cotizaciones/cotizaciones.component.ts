// cotizaciones.component.ts
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CotizacionService } from '../../../services/cotizacion.service';
import { Cotizacion } from '../../../interfaces/contizacion';
import { CommonModule } from '@angular/common';
import { TipoCotizacionPipe } from '../../../pipes/pipes';
import { UserCrudService } from '../../../services/user-crud.service';

@Component({
  selector: 'app-cotizaciones',
  imports: [CommonModule, TipoCotizacionPipe],
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent {
  listCotizacion: Cotizacion[] = [];

  constructor(
    private _cotizacionesService: CotizacionService,
    private _usuarioService: UserCrudService  // Verifica que el nombre y el tipo sean correctos
  ) { }

  ngOnInit(): void {
    this.getListCotizacion();
  }

  getListCotizacion() {
    this._cotizacionesService.getCotizacion().subscribe({
      next: (data: Cotizacion[]) => {
        console.log('Datos recibidos de cotizaciones:', data);
        const observables = data.map(cotizacion =>
          this._usuarioService.getUsuario(cotizacion.id_usuario).pipe(
            map((usuario) => {
              // Ahora usuario es de tipo usuario, gracias a get<Usuario>()
              cotizacion.usuario = usuario;
              return cotizacion;
            })
          )
        );
        forkJoin(observables).subscribe({
          next: (cotizacionesActualizadas: Cotizacion[]) => {
            this.listCotizacion = cotizacionesActualizadas;
            console.log('Cotizaciones con usuario:', cotizacionesActualizadas);
          },
          error: (err) => {
            console.error("Error obteniendo datos de usuarios:", err);
          }
        });
      },
      error: (err) => {
        console.error("Error obteniendo cotizaciones:", err);
      }
    });
  }
}
