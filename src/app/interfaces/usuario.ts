export interface usuario {
  id_usuario ?: number;
  estatus_usuario: number;
  nombre_usuario: string ;
  ap_usuario: string;
  am_usuario: string ;
  sexo_usuario: number | null;
  email_usuario: string;
  password_usuario: string;
  imagen_usuario: string | null;
  id_rol: number | null;
}
