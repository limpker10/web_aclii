// snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CustomSnackbarComponent} from "./custom-snackbar.component";

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    show(message: string, action: string = 'Cerrar', duration: number = 3000) {
        this.snackBar.open(message, action, {
            duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    showCustom(message: string, duration: number = 3000, type: 'success' | 'error' | 'info' = 'info') {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
            duration,
            data: { message },
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [`snackbar-${type}`],
        });
    }
}
