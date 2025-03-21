import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/shared/sidebar/sidebar.component";
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private _dashboardService: DashboardService){

  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this._dashboardService.getUsuarios().subscribe(data => {
      console.log('helo');
      console.log(data);
    })
  }

}
