// src/app/pipes/tipo-cotizacion.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoCotizacion',
  standalone: true // Si usas componentes standalone
})
export class TipoCotizacionPipe implements PipeTransform {
  transform(value: number): string {
    switch(value) {
      case 1: return 'Ingeniería Eléctrica';
      case 2: return 'Mantenimiento Industrial';
      case 3: return 'Soldadura Especializada';
      case 4: return 'Obras Civiles';
      default: return 'Sin categoría';
    }
  }
}
