import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    private rolesMap: { [key: number]: string } = {
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

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const rawProfile = this.authService.getProfileLocalstorage();
        if (!rawProfile) {
            // Usuario no autenticado
            return this.router.parseUrl('/authentication');
        }

        let user: any;
        try {
            user = JSON.parse(rawProfile);
        } catch (error) {
            console.error('Error parsing user profile:', error);
            return this.router.parseUrl('/authentication');
        }

        // Mapear ID de rol a nombre legible
        const userRoleName = this.rolesMap[user.rol] ?? 'Rol desconocido';

        // Obtener los roles permitidos de la ruta
        const allowedRoles: string[] = route.data['roles'];

        if (!allowedRoles || allowedRoles.length === 0) {
            // No se definieron roles, permitir acceso por defecto
            return true;
        }

        // Validar acceso
        if (allowedRoles.includes(userRoleName)) {
            return true;
        }

        // Rol no autorizado
        return this.router.parseUrl('/access-denied');
    }
}
