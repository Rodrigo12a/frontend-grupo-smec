import { Component } from '@angular/core';
import { usuario } from '../../../interfaces/usuario';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent {
  listUsuarios: usuario[] = [];

    constructor(private _userService: DashboardService){

    }

    getUsuarios(){
      this._userService.getUsuarios().subscribe(data =>{
        this.listUsuarios = data;
      })
    }
}
