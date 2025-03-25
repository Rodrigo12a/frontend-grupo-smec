import { TipoCotizacion } from "./tipo-cotizacion";
import { usuario } from "./usuario";


export interface Cotizacion {
  //id_cotizacion?: number;
  id_tipo_cotizacion: number;
  mensaje_adicional: string;
  id_usuario: number;

  /* Campos relacionales opcionales (si necesitas incluir datos relacionados)
  tipo_cotizacion?: TipoCotizacion;  // Si tienes esta interfaz
  usuario?: usuario;                 */
}
