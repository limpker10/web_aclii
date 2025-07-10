import {Component, inject, signal, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {NormService} from "../../../services/norm/norm.service";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {NgClass} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";

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
        NgClass,

    ],
    templateUrl: './norm-stepper.component.html',
    standalone: true,
    styleUrl: './norm-stepper.component.scss'
})
export class NormStepperComponent {
    private fb = inject(FormBuilder);
    private normService = inject(NormService);
    private router = inject(ActivatedRoute);
    private snackbarService = inject(SnackbarService);


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

    get items(): FormArray<FormGroup> {
        return this.normForm.get('items') as FormArray<FormGroup>;
    }

    subitemsArray(i: number): FormArray<FormGroup> {
        return this.items.at(i).get('subitems') as FormArray<FormGroup>;
    }

    ngOnInit(): void {
        const idParam = this.router.snapshot.paramMap.get('id');
        if (idParam) {
            const id = Number(idParam); // o parseInt(idParam, 10);
            this.loadNorms(id);
        }
    }

    loadNorms(id: number): void {
        this.normService
            .getNorm(id)
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

    addItem() {
        this.items.push(this.buildItem());
        console.log(this.buildItem())
    }

    removeItem(i: number) {
        this.items.removeAt(i);
    }

    addSubitem(i: number) {
        this.subitemsArray(i).push(this.buildSubitem());
        console.log(this.buildSubitem())
    }

    removeSubitem(i: number, j: number) {
        this.subitemsArray(i).removeAt(j);
    }

    // ------------------ guardar ---------------------------
    onSubmit(): void {
        const normId = this.normForm.value.id;

        if (!normId) {
            this.snackbarService.showCustom('ID de norma no encontrado.', 4000, 'error');
            return;
        }

        const items = this.items.value;

        for (const item of items) {
            // ✅ Solo crear ítems nuevos (sin ID)
            if (!item.id) {
                const itemPayload = {
                    name: item.name,
                    norm: normId
                };

                this.normService.createNormItems(itemPayload).subscribe({
                    next: (createdItem) => {
                        this.snackbarService.showCustom(`Item "${createdItem}" creado`, 3000, 'success');

                        // Crear subitems individualmente
                        for (const sub of item.subitems) {
                            if (!sub.id) { // ✅ Solo crear subitems nuevos
                                const subPayload = {
                                    name: sub.name,
                                    interpretation: sub.interpretation,
                                    item: createdItem.id
                                };

                                this.normService.createNormSubItems(subPayload).subscribe({
                                    next: () => {
                                        this.snackbarService.showCustom(`Subitem "${sub.name}" creado`, 2500, 'success');
                                    },
                                    error: (err) => {
                                        console.error('Error al crear subitem:', err);
                                        this.snackbarService.showCustom(`Error en subitem "${sub.name}"`, 4000, 'error');
                                    }
                                });
                            }
                        }
                    },
                    error: (err) => {
                        console.error('Error al crear item:', err);
                        this.snackbarService.showCustom(`Error al crear item "${item.name}"`, 4000, 'error');
                    }
                });
            }
        }
    }



}
