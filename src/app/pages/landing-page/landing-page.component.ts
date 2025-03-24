import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { UserService } from '../../services/landing.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  // En tu componente.ts
pdfUrl: SafeResourceUrl;


  constructor(private _usuarioService: UserService, private sanitizer: DomSanitizer){
    this.pdfUrl = sanitizer.bypassSecurityTrustResourceUrl('/assets/recursos/catalogo-smec.pdf');
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
