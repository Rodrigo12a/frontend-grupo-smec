import { Component } from '@angular/core';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { CotizacionesComponent } from "../../../components/shared/cotizaciones/cotizaciones.component";
import { CommonModule } from '@angular/common';

interface Quote {
  id: number;
  name: string;
  time: string;
  badges: { type: string; text: string }[];
  message: string;
  image: string;
  dateResponded?: Date;
}

@Component({
  selector: 'app-quote-dashboard',
  imports: [SidebarComponent, CotizacionesComponent, CommonModule],
  templateUrl: './quote-dashboard.component.html',
  styleUrl: './quote-dashboard.component.scss'
})

export class QuotesComponent {
  pendingQuotes: Quote[] = [
    {
      id: 1,
      name: 'Juan Pérez García',
      time: 'hace 2 horas',
      badges: [
        { type: 'primary', text: 'Cotización eléctrica' },
        { type: 'secondary', text: 'Urgente' }
      ],
      message: 'Necesito instalación completa en local de 200m² con certificado',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Ana María López',
      time: 'hace 1 día',
      badges: [
        { type: 'success', text: 'Cotización fontanería' }
      ],
      message: 'Presupuesto para cambio completo de tuberías en edificio antiguo',
      image: 'https://via.placeholder.com/50'
    }
  ];

  respondedQuotes: Quote[] = [
    {
      id: 3,
      name: 'Carlos Martínez',
      time: 'hace 3 días',
      badges: [
        { type: 'danger', text: 'Cotización gas' }
      ],
      message: 'Revisión completa instalación de gas natural',
      image: 'https://via.placeholder.com/50',
      dateResponded: new Date('2024-03-05')
    }
  ];

  moveToResponded(quoteId: number) {
    const quoteIndex = this.pendingQuotes.findIndex(q => q.id === quoteId);
    if (quoteIndex === -1) return;

    const quote = {
      ...this.pendingQuotes[quoteIndex],
      dateResponded: new Date()
    };

    this.respondedQuotes.push(quote);
    this.pendingQuotes.splice(quoteIndex, 1);
  }

  moveToPending(quoteId: number) {
    const quoteIndex = this.respondedQuotes.findIndex(q => q.id === quoteId);
    if (quoteIndex === -1) return;

    const quote = this.respondedQuotes[quoteIndex];
    delete quote.dateResponded;

    this.pendingQuotes.push(quote);
    this.respondedQuotes.splice(quoteIndex, 1);
  }

  deleteQuote(quoteId: number, listType: 'pending' | 'responded') {
    if (listType === 'pending') {
      this.pendingQuotes = this.pendingQuotes.filter(q => q.id !== quoteId);
    } else {
      this.respondedQuotes = this.respondedQuotes.filter(q => q.id !== quoteId);
    }
  }
}
