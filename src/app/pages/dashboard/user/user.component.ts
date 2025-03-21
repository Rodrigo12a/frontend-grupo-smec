import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserCrudService } from '../../../services/user-crud.service';
import { usuario } from '../../../interfaces/usuario';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  imports: [SidebarComponent, CommonModule, SpinnerComponent, ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  listUsuarios: usuario[] = []; // Cambia el tipo a any[] temporalmente para debug
  loading = false;

  constructor(private _userService: UserCrudService, private router: Router, private toastr : ToastrService) {}

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    this._userService.getListUsuarios().subscribe({
      next: (usuarios) => {
        this.loading = true;
        this.listUsuarios = usuarios; // Ahora recibes directamente el array
        console.log("Usuarios:", this.listUsuarios);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error:", err);
      }
    });
  }
  navigateToEdit(): void {
    this.router.navigate(['/update-user']);
  }
  navigateToRegister(): void {
    this.router.navigate(['/insert-user']);
  }
  updateUser(id: number): void {
    this.router.navigate(['/update-user', id]);
  }
  deleteUser(id: number): void {
    this.loading = true;
    this._userService.deleteUsuario(id).subscribe(() => {
      this.getListUsers();
      this.toastr.warning('Usuario eliminado', 'Usuario eliminado');
      this.loading = false;
  });
}
}
