import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { UserService } from '../../services/landing.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {


  constructor(private _usuarioService: UserService){

  }

  ngOnInit(): void{
    this.getUsers();
  }

  getUsers(){
    this._usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
    })
  }

}
