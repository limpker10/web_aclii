import {Component, OnInit} from '@angular/core';
import {AuditService} from "../../../services/audit/audit.service";
import {Audit, InstitutoCombo, LaboratorioCombo} from "../../../interfaces/audit/audit.interfaces";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatCard, MatCardContent} from "@angular/material/card";
import {FeathericonsModule} from '../../../icons/feathericons/feathericons.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LaboratorioService} from "../../../services/laboratory/laboratorio.service";
import {InstitutoService} from "../../../services/institute/instituto.service";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../interfaces/auth/auth.interfaces";
import {Norm} from "../../../interfaces/norm/norm.interfaces";
import {NormService} from "../../../services/norm/norm.service";
import {ActivatedRoute} from "@angular/router";

interface AfterViewInit {
}

@Component({
    selector: 'app-audit-create',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        MatCard,
        MatCardContent,
        FeathericonsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinner
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './audit-create.component.html',
    standalone: true,
    styleUrl: './audit-create.component.scss'
})
export class AuditCreateComponent implements OnInit  {

    auditForm!: FormGroup;
    isSubmitting = false;
    errorMessage = '';
    entityTypes = [
        { value: 'laboratory', label: 'Laboratorio' },
        { value: 'institute', label: 'Instituto' }
    ];

    auditors:User[]= [];
    auditoresInternal:User[]= [];

    statuses = [
        { id: 1, name: 'Programada' },
        { id: 2, name: 'En Progreso' },
        { id: 3, name: 'Completada' }
    ];

    standards:Norm[]= [];
    laboratories: LaboratorioCombo[] = [];
    institutes: InstitutoCombo[] = [];
    coordinadores: { id: number | null, nombre: string }[] = [];
    selectedCoordinadorId: number | null = null;
    auditToEditId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private auditService: AuditService,
        private laboratorioService: LaboratorioService,
        private institutoService: InstitutoService,
        private snackbarService:SnackbarService,
        private userService: UserService,
        private normService: NormService,
        private route: ActivatedRoute,
    ) {
        this.auditForm = this.fb.group({
            entity_type: ['', Validators.required],
            entity_id: [null, [Validators.required, Validators.min(1)]],
            auditor: [null, Validators.required],
            internal_auditor: [null, ],
            coordinator: [{ value: null, disabled: this.coordinadores.length === 0 }, Validators.required],
            date: [this.getTodayDate(), Validators.required],
            status: [2],
            applicable_standard: [null, Validators.required],
            observations: [''],
            supporting_documents: ['']
        }, {
            validators: [this.validateDistinctAuditors]
        });
    }

    ngOnInit(): void {

        this.auditForm.get('entity_type')?.valueChanges.subscribe(type => {
            this.auditForm.get('entity_id')?.reset();
            if (type === 'laboratory') {
                this.laboratorioService.getLaboratoriosCombo().subscribe({
                    next: (labs) => {
                        this.laboratories = labs;
                        console.log(labs)
                    },
                    error: (err) => console.error('Error cargando laboratorios', err)
                });
            } else if (type === 'institute') {
                this.institutoService.getInstitutosCombo().subscribe({
                    next: (insts) => this.institutes = insts,
                    error: (err) => console.error('Error cargando institutos', err)
                });
            }
            this.loadNormsByType(type);
        });

        this.auditForm.get('entity_id')?.valueChanges.subscribe(id => {
            const type = this.auditForm.get('entity_type')?.value;

            if (type === 'laboratory') {
                const selectedLab = this.laboratories.find(lab => lab.id === id);
                this.setCoordinator(selectedLab?.encargado_id ?? null, selectedLab?.encargado_nombre ?? null);
            } else if (type === 'institute') {
                const selectedInst = this.institutes.find(inst => inst.id === id);
                this.setCoordinator(selectedInst?.encargado_id ?? null, selectedInst?.encargado_nombre ?? null);
            } else {
                this.setCoordinator(null, null);
            }
        });
        this.auditForm.get('auditor')?.valueChanges.subscribe((auditorId) => {
            if (auditorId !== null) {
                this.auditForm.patchValue({ status: 2 });
            }
        });

        this.loadUsersAuditors();

        const id = +this.route.snapshot.paramMap.get('id')!; // con coerción a number y non-null assertion
        if (id) {
            this.auditToEditId = id;
            this.loadAuditToEdit(id);
        }
    }

    createAudit(): void {
        if (this.auditForm.invalid) {
            this.auditForm.markAllAsTouched();
            return;
        }
        const auditor = this.auditForm.get('auditor')?.value;
        const coordinator = this.auditForm.get('coordinator')?.value;
        if (!auditor || !coordinator) {
            this.snackbarService.showCustom(
                "Debe seleccionar un auditor y un coordinador válidos.",
                3000,
                "error"
            );
            return;
        }


        this.isSubmitting = true;
        const auditData: Audit = this.auditForm.value;
        console.log(auditData)


        if (this.auditToEditId) {

            this.auditService.updateAudit(this.auditToEditId, auditData).subscribe({
                next: () => {
                    this.snackbarService.showCustom("Auditoría actualizada con éxito", 3000, "success");
                    this.isSubmitting = false;
                },
                error: (err) => {
                    console.error('Error al actualizar auditoría:', err);
                    this.snackbarService.showCustom("Error al actualizar auditoría", 3000, "error");
                    this.isSubmitting = false;
                }
            });
        } else {
            this.auditService.createAudit(auditData).subscribe({
                next: (audit) => {
                    console.log('Auditoría creada con éxito:', audit);
                    this.isSubmitting = false;
                    this.auditForm.reset();
                    this.snackbarService.showCustom("Auditoría creada con éxito", 3000, "success");
                },
                error: (err) => {
                    console.error('Error al crear auditoría:', err);
                    this.isSubmitting = false;
                    this.snackbarService.showCustom("Error al crear auditoría: " + err.message, 3000, "error");
                }
            });
        }
    }

    loadUsersAuditors(): void {
        this.userService.getAuditorsCombo().subscribe({
            next: (users) => {
                this.auditors = users;
                console.log(users)
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
            }
        });
    }
    loadUsersAuditorsInternal(): void {
        this.userService.getAuditorsCombo().subscribe({
            next: (users) => {
                this.auditoresInternal = users;
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
            }
        });
    }

    loadNormsByType(type: 'laboratory' | 'institute'): void {
        const category = type === 'laboratory' ? 'LAB' : 'INST';

        this.normService.getNormsParams({ category }).subscribe({
            next: (norms: Norm[]) => {
                this.standards = norms;
            },
            error: (err) => console.error('Error cargando normas:', err)
        });
    }
    // Getter para lista dinámica de entidades
    get entityList(): (LaboratorioCombo | InstitutoCombo)[] {
        const type = this.auditForm.get('entity_type')?.value;

        if (type === 'laboratory') {
            return Array.isArray(this.laboratories) ? this.laboratories : [];
        }

        if (type === 'institute') {
            return Array.isArray(this.institutes) ? this.institutes : [];
        }

        return [];
    }

    // Validación personalizada: auditor ≠ internal_auditor
    validateDistinctAuditors(group: AbstractControl): ValidationErrors | null {
        const auditor = group.get('auditor')?.value;
        const internal = group.get('internal_auditor')?.value;
        return auditor && internal && auditor === internal
            ? { sameAuditorError: true }
            : null;
    }
    getTodayDate(): string {
        const limaDate = new Date().toLocaleString("en-US", {
            timeZone: "America/Lima"
        });
        const date = new Date(limaDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    loadAuditToEdit(id: number): void {
        this.loadUsersAuditors();
        this.auditService.getAuditById(+id).subscribe({
            next: (data) => {
                this.auditForm.patchValue({
                    entity_type: data.entity_type,
                    entity_id: data.entity_id,
                    auditor: data.auditor?.id ?? null,
                    internal_auditor: data.internal_auditor?.id ?? null,
                    coordinator: data.coordinator?.id ?? null,
                    date: data.date,
                    applicable_standard: data.applicable_standard?.id ?? null,
                    observations: data.observations ?? '',
                    supporting_documents: data.supporting_documents ?? ''
                });

                this.loadNormsByType(data.entity_type);
                this.setCoordinator(data.coordinator?.id ?? null, data.coordinator?.nombre ?? null);
            },
            error: (err) => console.error('Error cargando auditoría', err)
        });
    }

    private setCoordinator(id: number | null, nombre: string | null): void {
        this.coordinadores = [{
            id: id ?? null,
            nombre: nombre ?? 'No tiene coordinador registrado'
        }];

        this.selectedCoordinadorId = id ?? null;

        if (this.selectedCoordinadorId) {
            this.auditForm.get('coordinator')?.enable();
            this.auditForm.get('coordinator')?.setValue(this.selectedCoordinadorId);
        } else {
            this.auditForm.get('coordinator')?.disable();
            this.auditForm.get('coordinator')?.setValue(null);
        }
    }

}

