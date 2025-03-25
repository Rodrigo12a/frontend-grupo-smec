import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { CotizacionesComponent } from "../../../components/shared/cotizaciones/cotizaciones.component";

@Component({
  selector: 'app-quote-dashboard',
  imports: [SidebarComponent, CotizacionesComponent],
  templateUrl: './quote-dashboard.component.html',
  styleUrl: './quote-dashboard.component.scss'
})
export class QuoteDashboardComponent {

}
