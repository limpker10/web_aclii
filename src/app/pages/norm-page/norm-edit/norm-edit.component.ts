import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe, NgFor, DatePipe } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import {NormService} from "../../../services/norm/norm.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FeathericonsModule} from "../../../icons/feathericons/feathericons.module";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-norm-edit',
    templateUrl: './norm-edit.component.html',
    styleUrls: ['./norm-edit.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe, NgFor, DatePipe,
        MatFormFieldModule, MatInputModule, MatSelectModule,
        MatCheckboxModule, MatSlideToggleModule, MatButtonModule, FeathericonsModule, ReactiveFormsModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule,

    ]
})
export class NormEditComponent {

    // ——— Inyecciones ———
    private fb          = inject(FormBuilder);
    private route       = inject(ActivatedRoute);
    private router      = inject(Router);
    private snack       = inject(MatSnackBar);
    private normService = inject(NormService);

    // ——— Catálogo de categorías ———
    readonly categoryOptions = [
        { value: 'LAB',  label: 'Laboratorio' },
        { value: 'INST', label: 'Instituto'   }
    ];

    // ——— Propiedades ———
    normForm: FormGroup = this.buildForm();  // ← buildForm YA existe
    normId!: number;

    // ——————————————————————————————————————————
    //                Constructor
    // ——————————————————————————————————————————
    constructor() {
        this.loadNorm();           // carga los datos usando el id de la ruta
    }

    // ——————————————————————————————————————————
    //                 Métodos
    // ——————————————————————————————————————————

    /** Crea el FormGroup con todas las validaciones */
    private buildForm(): FormGroup {
        return this.fb.group({
            code:             ['', Validators.required],
            title:            ['', Validators.required],
            title_en:         [''],
            organization:     [''],
            version_year:     ['', Validators.pattern(/^\d{4}$/)],
            edition:          [''],
            pages:            ['', Validators.pattern(/^[0-9]+$/)],
            publication_date: ['', Validators.required],
            ref_peru:         [''],
            approved_by:      [''],
            replaced_by:      [''],
            ics:              [''],
            notes:            [''],
            description:      [''],
            about:            [''],
            video_link:       ['', Validators.pattern('https?://.+')],
            category:         ['', Validators.required],
            committee:        [''],
            subcommittee:     [''],
            mandatory:        [false],
            status:           [true]
        });
    }

    /** Lee el parámetro :id y carga la norma */
    private loadNorm(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (!idParam) {
            this.snack.open('ID de norma no encontrado.', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/norms']);
            return;
        }

        this.normId = +idParam;

        this.normService.getNormById(this.normId).subscribe({
            next: norm => this.patchForm(norm),
            error: () =>
                this.snack.open('No se pudo cargar la norma.', 'Cerrar', { duration: 3000 })
        });
    }

    /** Rellena el formulario con los datos traídos del backend */
    private patchForm(norm: any): void {
        // convierte la fecha ISO a YYYY-MM-DD
        const pubDate = norm.publication_date?.slice(0, 10) ?? '';
        this.normForm.patchValue({ ...norm, publication_date: pubDate });
    }

    /** Envía PUT/PATCH para actualizar */
    submit(): void {
        if (this.normForm.invalid) { return; }

        const raw = this.normForm.value;
        const payload = {
            ...raw,
            version_year: raw.version_year === '' ? null : Number(raw.version_year),
            pages:        raw.pages        === '' ? null : Number(raw.pages),
            publication_date: this.formatDate(raw.publication_date)
        };

        this.normService.updateNorm(this.normId, payload).subscribe({
            next: () => {
                this.snack.open('Norma actualizada.', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/norms']);
            },
            error: () =>
                this.snack.open('Error al actualizar norma.', 'Cerrar', { duration: 3000 })
        });
    }

    /** Convierte cualquier valor fecha a YYYY-MM-DD o null */
    private formatDate(value: unknown): string | null {
        if (!value) { return null; }
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) { return value; }
        const d = new Date(value as string);
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mm}-${dd}`;
    }
}
