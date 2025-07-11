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
import {MatTooltip} from "@angular/material/tooltip";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

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
    title: string;
    publication_date: string; // ISO date string: YYYY-MM-DD
    category: 'LAB' | 'INST'; // choices

    organization?: string | null;
    title_en?: string | null;
    version_year?: number | null;
    edition?: string | null;
    pages?: number | null;
    description?: string | null;
    about?: string | null;
    video_link?: string | null;
    ref_peru?: string | null;
    replaced_by?: string | null;
    approved_by?: string | null;
    ics?: string | null;
    mandatory: boolean;
    notes?: string | null;
    committee?: string | null;
    subcommittee?: string | null;
    status: boolean;

    created_at?: string;
    updated_at?: string;

    // Relaciones
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
            .getNormById(id)
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
            interpretation: [sub?.interpretation ?? '', Validators.required],
        });
    }

    addItem() {
        this.items.push(this.buildItem());
        console.log(this.buildItem())
    }

    removeItem(index: number): void {
        const item = this.items.at(index).value;

        // Si el ítem jamás se guardó (no tiene `id`), bórralo localmente.
        if (!item.id) {
            this.items.removeAt(index);
            return;
        }

        // Ítem existente → DELETE al backend
        this.normService.deleteItem(item.id).subscribe({
            next: () => this.items.removeAt(index),
            error: () => {}
        });
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
        if (this.normForm.invalid) { return; }

        const normId = this.normForm.value.id!;   // siempre existe (pantalla de edición)

        /* 1 ▸ Actualizar la cabecera (Norm) si cambió algo */


        /* 2 ▸ Recorrer cada Ítem del FormArray */
        this.items.controls.forEach((itemCtrl, idx) => {
            const item = itemCtrl.value as Item;

            /* 2A · Ítem NUEVO → POST */
            if (!item.id) {
                this.createItemWithSubs(normId, item, idx);
                return;                               // nada más que hacer con ese ítem
            }

            /* 2B · Ítem EXISTENTE */
            if (itemCtrl.dirty) {
                const itemPayload = {
                    name: item.name,
                    norm: this.normForm.value.id           // ⚠️ Incluye la FK
                };

                this.normService.updateItem(item.id, itemPayload)          // PATCH
                    .pipe(
                        tap(() =>
                            this.snackbarService.showCustom(
                                `Ítem "${item.name}" actualizado`,
                                3000,
                                'success'
                            )
                        ),
                        catchError(err => {
                            this.snackbarService.showCustom(
                                `Error al actualizar ítem: ${err.error?.detail ?? 'desconocido'}`,
                                4000,
                                'error'
                            );
                            return of(null); // evita que el flujo se corte
                        })
                    )
                    .subscribe();
            }

            /* 2B-sub · Sub-ítems de un ítem existente */
            const itemId = item.id;
            this.subitemsArray(idx).controls.forEach(subCtrl => {
                const sub = subCtrl.value as Subitem;

                // Sub-ítem NUEVO
                if (!sub.id) {
                    this.normService.createSubItem({ ...sub, item: itemId })
                        .pipe(
                            tap(created =>
                                this.snackbarService.showCustom(
                                    `Sub-ítem "${created.name}" creado`,
                                    2500,
                                    'success'
                                )
                            ),
                            catchError(err => {
                                this.snackbarService.showCustom(
                                    `Error al crear sub-ítem: ${err.error?.detail ?? 'desconocido'}`,
                                    4000,
                                    'error'
                                );
                                return of(null);
                            })
                        )
                        .subscribe();

                    // Sub-ítem EDITADO
                } else if (subCtrl.dirty) {
                    const subPayload = { ...sub, item: itemId };

                    this.normService.updateSubItem(sub.id, subPayload)
                        .pipe(
                            tap(() =>
                                this.snackbarService.showCustom(
                                    `Sub-ítem "${sub.name}" actualizado`,
                                    2500,
                                    'success'
                                )
                            ),
                            catchError(err => {
                                this.snackbarService.showCustom(
                                    `Error al actualizar sub-ítem: ${err.error?.detail ?? 'desconocido'}`,
                                    4000,
                                    'error'
                                );
                                return of(null);
                            })
                        )
                        .subscribe();
                }
            });
        });
    }

    /* ---------- Helper para crear ítem + sus sub-ítems ---------- */
    private createItemWithSubs(normId: number, item: Item, idx: number): void {
        console.log("estoy creando")
        this.normService
            .createItem({ name: item.name, norm: normId })
            .subscribe(createdItem => {

                /* Guarda el id que devolvió el backend para futuras ediciones */
                this.items.at(idx).get('id')!.setValue(createdItem.id);

                /* Crea cada sub-ítem nuevo asociado al ítem recién creado */
                item.subitems.forEach(sub =>
                    this.normService
                        .createSubItem({ ...sub, item: createdItem.id! })
                        .subscribe()
                );
            });
    }




}
