import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { UserService } from '../../services/landing.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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


  constructor(private _usuarioService: UserService, private sanitizer: DomSanitizer, private router: Router){
    this.pdfUrl = sanitizer.bypassSecurityTrustResourceUrl('/assets/recursos/CATALOGO.pdf');
  }

  ngOnInit(): void{
    this.getUsers();
  }

  getUsers(){
    this._usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
    })
  }

  navigateToQuote(){
    this.router.navigate(['/quote']);
  }
  navigateToAboutUs(){
    this.router.navigate(['/about-us']);
  }


}
