import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment.development";
import {Register, TokenResponse, UserLogin} from "../../interfaces/auth/auth.interfaces";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private apiUrl = environment.apiUrl;

    private platformId!: Object;

    constructor(@Inject(PLATFORM_ID) platformId: Object,private http: HttpClient, private router: Router) {
        this.platformId = platformId;
    }

    login(data: UserLogin): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.apiUrl}/sileii_services/login/`, data).pipe(
            tap(response => {
                localStorage.setItem('access_token', response.token);
                localStorage.setItem('expiry', response.expiry);
            })
        );
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem('access_token');
        }
        return null;
    }


    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');

            // Llamada al backend para invalidar el token (opcional con Knox)
            if (token) {
                this.http.post(`${this.apiUrl}/sileii_services/logout/`, {}).subscribe({
                    next: () => this.clearSession(),
                    error: () => this.clearSession() // limpia igual en caso de error
                });
            } else {
                this.clearSession();
            }
        }
    }
    private clearSession(): void {
        localStorage.clear(); // elimina token, perfil y todo
        this.router.navigate(['/authentication']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/sileii_services/userinfo/`).pipe(
            tap(profile => {
                localStorage.setItem('user_profile', JSON.stringify(profile));
            })
        );
    }

    getProfileLocalstorage(): string | null {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('user_profile');
        }
        return null;
    }


    isAuth(): boolean {
        const token = this.getToken();
        if (!token){
            return false
        }
        return true;
    }


    getUserRoleName(): string | null {
        const rolesMap: { [key: number]: string } = {
            1: 'Administrador',
            2: 'Coordinador Laboratorio',
            3: 'Coordinador Instituto',
            4: 'Especialista Instituto',
            5: 'Especialista Laboratorio',
            6: 'Portero',
            7: 'Secretaria',
            8: 'Usuario',
            9: 'Auditor'
        };

        if (isPlatformBrowser(this.platformId)) {
            const userData = localStorage.getItem('user_profile');
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    return rolesMap[user.rol] ?? 'Rol desconocido';
                } catch (error) {
                    console.error('Error parsing user profile from localStorage', error);
                    return null;
                }
            }
        }
        return null;
    }

    register(data: Register): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/`, data);
    }



}
