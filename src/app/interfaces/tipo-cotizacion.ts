import { Catalogo } from "./catalogo";

export interface TipoCotizacion {
  id_tipo_cotizacion?: number;    // Auto-incremental (opcional en creación)
  nombre_cotizacion: string;      // Nombre requerido (varchar 50)
  id_catalogo: number | null;     // Relación opcional con catálogo

  // Campo relacional opcional (si necesitas incluir datos del catálogo)
  catalogo?: Catalogo;            // Si tienes interfaz para Catalogo
}

