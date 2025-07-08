import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

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
    ): boolean | UrlTree {

        const currentUrl = state.url;
        const rawProfile = this.authService.getProfileLocalstorage();
        const isLoggedIn = !!rawProfile;

        if (currentUrl === '/authentication') {
            if (isLoggedIn) {
                try {
                    const user = JSON.parse(rawProfile);
                    const roleName = this.rolesMap[user.rol] ?? 'Usuario';

                    // Redirección según el rol
                    if (roleName === 'Usuario' || roleName === 'Secretaria' || roleName === 'Portero') {
                        return this.router.parseUrl('/coordinator');
                    }

                    return this.router.parseUrl('/'); // Redirige a inicio si ya está logueado
                } catch (error) {
                    console.error('Error parsing user profile:', error);
                    return this.router.parseUrl('/authentication');
                }
            }

            return true; // Permite acceso a login si no está logueado
        }

        if (!isLoggedIn) {
            return this.router.parseUrl('/authentication'); // Redirige a login si no está autenticado
        }

        return true; // Usuario autenticado puede continuar
    }
}
