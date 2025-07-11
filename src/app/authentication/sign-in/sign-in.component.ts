import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {SnackbarService} from "../../common/custom-snackbar/snackbar.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, MatButton, MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    standalone: true,
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private snackbarService: SnackbarService
    ) {
        this.authForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // Password Hide
    hide = true;
    isLoading: boolean = false;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.isLoading = true;
            const credentials: any = this.authForm.value;

            this.authService.login(credentials).subscribe({
                next: res => {
                    console.log('Logged in!', res);
                    this.snackbarService.showCustom("Logged in successfully!", 3000, "success");

                    this.authService.getProfile().subscribe({
                        next: (usuario) => {
                            if (!usuario.rol) {
                                this.isLoading = false;
                                console.warn('El usuario no tiene un rol asignado');
                                this.snackbarService.showCustom('No tiene un rol asignado. Comuníquese con el administrador.', 3000, "error");
                                this.router.navigate(['/coordinador-page']);
                                return;
                            }

                            this.router.navigate(['/']);
                        },
                        error: (err) => {
                            this.isLoading = false;
                            console.error('Error al cargar el perfil del usuario', err);
                            this.snackbarService.showCustom('Error al cargar el perfil del usuario', 3000, "error");
                        }
                    });


                },
                error: err => {
                    this.isLoading = false;
                    this.snackbarService.showCustom(err.message, 3000, "error");
                    console.error('Login failed', err);
                }
            });
        } else {
            console.log('Formulario inválido. Revisa los campos.');
        }
    }

}
