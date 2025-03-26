import { usuario } from '../../../interfaces/usuario';
import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CotizacionService } from '../../../services/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  imports: [],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.scss'
})
export class CotizacionesComponent {

  constructor(private _cotizacionesService : CotizacionService){

  }

  ngOnInit(): void{
    this.getListCotizacion

  }

  getListCotizacion(){
    this._cotizacionesService.getCotizacion().subscribe((data) => {
      console.log(data);

    })

  }


}
