import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Cotizacion } from '../../interfaces/contizacion';

@Component({
  selector: 'app-quote',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo_cotizacion: ['', [Validators.required]],
      mensaje_adicional: ['', Validators.required]
    });
  }

  addCotizacion(){
    const  cotizacion: Cotizacion = {
      tipo_cotizacion: this.form.value.tipo_cotizacion,
      mensaje_adicional: this.form.value.mensaje_adicional
    }
    console.log(cotizacion);
  }
}
