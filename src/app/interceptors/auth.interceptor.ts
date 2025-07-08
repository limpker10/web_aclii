import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // URLs que no deben incluir token (pueden ser parciales para mayor flexibilidad)
    const excludedUrls = [
        '/auth/login/google/',
        '/auth/sign-up/',
    ];

    // Ignorar si la URL contiene alguna de las exclusiones
    const isExcluded = excludedUrls.some(urlPart => req.url.includes(urlPart));
    if (isExcluded) {
        return next(req);
    }

    const token = authService.getToken();

    // Si no hay token, seguir sin modificar la petición
    if (!token) {
        return next(req);
    }

    // Clonar la petición para agregar el header Authorization
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Token ${token}`,
        },
    });

    return next(authReq).pipe(
        catchError(error => {
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/authentication']);
                return throwError(() => new Error('Unauthorized - session expired.'));
            }
            return throwError(() => error);
        })
    );
};
