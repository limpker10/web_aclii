import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NormService } from "../../../services/norm/norm.service";
import { Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SnackbarService } from "../../../common/custom-snackbar/snackbar.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from '@angular/common';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
@Component({
    selector: 'app-add-norm',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatSelectModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FeathericonsModule,
        MatDatepickerModule,
        MatIconModule
    ],
    templateUrl: './add-norm.component.html',
    styleUrl: './add-norm.component.scss',
    providers: [provideNativeDateAdapter()],
})
export class AddNormComponent {
    categoryOptions = [
        { value: 'LAB', label: 'Laboratorio' },
        { value: 'INST', label: 'Instituto' }
    ];

    /** Se declara pero NO se usa hasta que el constructor la cree */
    normForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private normService: NormService,
        private router: Router,
    ) {
        this.normForm = this.buildForm();   // ← ahora sí existe this.fb
    }

    /** Método helper para dejar limpio el constructor */
    private buildForm(): FormGroup {
        return this.fb.group({
            code: ['', Validators.required],
            title: ['', Validators.required],
            title_en: [''],
            organization: [''],
            version_year: ['', Validators.pattern(/^\d{4}$/)],
            edition: [''],
            pages: [
                '',                                   // ← valor inicial
                [Validators.required,                 // ← síncronos (array)
                    Validators.pattern(/^[0-9]+$/)],     //    ⤴ se encadenan aquí
                []                                    // ← async validators (vacío si no usas)
            ],
            publication_date: ['', Validators.required],
            ref_peru: [''],
            approved_by: [''],
            replaced_by: [''],
            ics: [''],
            notes: [''],
            description: [''],
            about: [''],
            video_link: ['', Validators.pattern('https?://.+')],
            category: ['', Validators.required],
            committee: [''],
            subcommittee: [''],
            mandatory: [false],
            status: [true]
        });
    }

    submit(): void {
        if (this.normForm.invalid) { return; }

        console.log(this.normForm.value)

        this.normService.createNorm(this.normForm.value).subscribe({
            next: () => {
                this.router.navigate(['/norms']);
            },
            error: (error) => {
                console.log(error)
            }
        });
    }
}
