import {Audit} from "../audit/audit.interfaces";

export interface UserLogin {
    username: string;
    password: string;
}

export interface TokenResponse {
    token: string;
    expiry: string;
}

// register.model.ts
export interface Register {
    email: string;
    password: string;
    nombre: string;
    apellidos?: string;
    dni?: string;
    telefono?: string;
    direccion?: string;
    resumen?: string;
    fecha_eleccion?: string;
    fecha_culminacion?: string;
    categoria?: string;
    regimen?: string;
    estado?: string;
    is_staff?: boolean;
    rol?: number; // ID del rol
}

// rol.model.ts
export interface Rol {
    id?: number;
    nombre: string;
    descripcion?: string;
    permisos?: any; // o usa un tipo específico si conoces la estructura del JSON
}

export interface RolApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Rol[];
}

export interface User {
    id: number;
    email: string;
    nombre: string;
    apellidos: string;
    dni: number;
    telefono: string;
    direccion: string;
    resumen: string;
    fecha_eleccion: string | null;
    fecha_culminacion: string | null;
    categoria: string;
    regimen: string;
    estado: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    email_verified_at: string | null;
    remember_token: string | null;
    is_staff: boolean;
    rol: Rol | null; // puedes reemplazar `any` por una interfaz `Rol` si tienes su estructura
}

