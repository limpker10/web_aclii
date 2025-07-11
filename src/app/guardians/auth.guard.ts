import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const rawProfile  = this.authService.getProfileLocalstorage();
        const isLoggedIn  = !!rawProfile;

        /* ---------- 1. NO autenticado → login ---------- */
        if (!isLoggedIn) {
            return this.router.parseUrl('/authentication');
        }

        /* ---------- 2. Obtén el rol del usuario ---------- */
        let roleName = 'Rol desconocido';
        try {
            const user   = JSON.parse(rawProfile);
            roleName     = this.rolesMap[user.rol] ?? 'Rol desconocido';
        } catch (e) {
            console.error('Error leyendo user_profile', e);
            return this.router.parseUrl('/authentication');
        }

        /* ---------- 3. Verifica roles indicados en la ruta ---------- */
        const allowedRoles = route.data['roles'] as string[] | undefined;

        if (allowedRoles && !allowedRoles.includes(roleName)) {
            // No tiene permiso → redirige o bloquea
            return this.router.parseUrl('/dashboard');   // o '/403' si tienes página 403
            // también podrías: return false;  // cancela navegación sin redirección
        }

        /* ---------- 4. Autorizado ---------- */
        return true;
    }
}
