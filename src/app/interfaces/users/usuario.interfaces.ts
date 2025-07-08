export interface Usuario {
    id: number;
    rol: number;
    email: string;
    nombre: string;
    apellidos: string;
    dni: number | null;
    telefono: string;
    direccion: string;
    resumen: string;
    fecha_eleccion: string | null;
    fecha_culminacion: string | null;
    categoria: string;
    regimen: string;
    estado: boolean;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
    remember_token: string | null;
    is_staff: boolean;
}

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Usuario[];
}
