import {Component, inject, signal, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {NormService} from "../../../services/norm/norm.service";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {JsonPipe, NgClass, SlicePipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSlideToggle} from "@angular/material/slide-toggle";

// norm.model.ts
export interface Subitem {
    id: number | null;
    name: string;
    interpretation: string;
    created_at?: string;
    updated_at?: string;
    example_files?: any[];
    item?: number;
}

export interface Item {
    id: number | null;
    name: string;
    created_at?: string;
    updated_at?: string;
    norm?: number;
    subitems: Subitem[];
}

export interface Norm {
    id: number | null;
    code: string;
    organization: string;
    title: string;
    version_year: number;
    description: string;
    about: string;
    video_link: string;
    category: string;
    status: boolean;
    created_at?: string;
    updated_at?: string;
    items: Item[];
    files: any[];
}

@Component({
    selector: 'app-norm-stepper',
    imports: [
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatSlideToggle,
        NgClass,

    ],
    templateUrl: './norm-stepper.component.html',
    standalone: true,
    styleUrl: './norm-stepper.component.scss'
})
export class NormStepperComponent {
    private fb = inject(FormBuilder);
    private normService = inject(NormService);

    // ------------------ formulario raíz ------------------
    normForm: FormGroup = this.fb.group({
        id: [],
        code: ['', Validators.required],
        organization: [''],
        title: ['', Validators.required],
        version_year: [new Date().getFullYear(), Validators.required],
        description: [''],
        about: [''],
        video_link: [''],
        category: [''],
        status: [false],
        items: this.fb.array([]),
    });

    // ------------------ atajos ----------------------------
    get items(): FormArray<FormGroup> {
        return this.normForm.get('items') as FormArray<FormGroup>;
    }
    subitemsArray(i: number): FormArray<FormGroup> {
        return this.items.at(i).get('subitems') as FormArray<FormGroup>;
    }

    // ------------------ ciclo de vida ---------------------
    ngOnInit(): void {
        this.loadNorms();            // ← aquí se dispara la carga
    }

    // ✅ Tu función adaptada: hace GET /norms/1 y parchea
    loadNorms(): void {
        this.normService
            .getNorm(1)
            .subscribe({
                next: (data: Norm) => {
                    console.log(data);       // debug opcional
                    this.populateForm(data); // ← llena el formulario
                },
                error: (err) => {
                    console.error('Error al cargar norma:', err);
                },
            });
    }

    // ------------------ helpers ---------------------------
    private populateForm(norm: Norm): void {
        // 1. campos simples
        this.normForm.patchValue(norm);

        // 2. limpiar y reconstruir items
        this.items.clear();
        norm.items.forEach((it) => this.items.push(this.buildItem(it)));
    }

    private buildItem(item?: Item): FormGroup {
        return this.fb.group({
            id: [item?.id ?? null],
            name: [item?.name ?? '', Validators.required],
            subitems: this.fb.array(
                item?.subitems?.map((s) => this.buildSubitem(s)) ?? []
            ),
        });
    }

    private buildSubitem(sub?: Subitem): FormGroup {
        return this.fb.group({
            id: [sub?.id ?? null],
            name: [sub?.name ?? '', Validators.required],
            interpretation: [sub?.interpretation ?? ''],
        });
    }

    // ------------------ acciones UI (crear/eliminar) ------
    addItem()          { this.items.push(this.buildItem()); }
    removeItem(i: number)  { this.items.removeAt(i); }
    addSubitem(i: number)  { this.subitemsArray(i).push(this.buildSubitem()); }
    removeSubitem(i: number, j: number) { this.subitemsArray(i).removeAt(j); }

    // ------------------ guardar ---------------------------
    onSubmit(): void {
        if (this.normForm.invalid) { this.normForm.markAllAsTouched(); return; }
        const payload = this.normForm.value as Norm;
        console.log('🚀 listo para enviar:', payload);
        // this.normService.updateNorm(payload.id!, payload).subscribe(...)
    }
}
