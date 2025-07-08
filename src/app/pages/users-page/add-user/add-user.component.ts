import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-add-user',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule, FeathericonsModule, NgxEditorModule, MatDatepickerModule, FileUploadModule, MatSelectModule, MatRadioModule, NgIf, ReactiveFormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './add-user.component.html',
    standalone: true,
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
    registerForm!: FormGroup;
    hide = true;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            telefono: [''],
            direccion: [''],
            resumen: [''],
            fecha_eleccion: [''],
            fecha_culminacion: [''],
            categoria: [''],
            regimen: [''],
            estado: [true],
            is_staff: [false],
            rol: [null, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.userService.create(this.registerForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/authentication']);
                },
                error: err => {
                    console.error('Error al registrar:', err);
                }
            });
        }
    }

}
