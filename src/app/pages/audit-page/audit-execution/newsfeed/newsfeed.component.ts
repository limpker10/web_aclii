import {Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuditQuestion } from '../../../../interfaces/audit/audit.interfaces';
import { AuditQuestionService } from '../../../../services/audit/audit-question.service';
import { SnackbarService } from '../../../../common/custom-snackbar/snackbar.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuditService } from '../../../../services/audit/audit.service';
@Component({
    selector: 'app-newsfeed',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        FeathericonsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
    ],
    templateUrl: './newsfeed.component.html',
    standalone: true,
    styleUrl: './newsfeed.component.scss',
})
export class NewsfeedComponent {
    questionForm!: FormGroup;
    loading = false;
    allAnswered = false;
    @Input() status!: { id: number; name: string; description: string };
    @Input() auditId!: number;
    @Input() questions: AuditQuestion[] = [];

    disabled = this.isReadOnly;

    complianceOptions: string[] = [
        'Complies',
        'Does Not Comply',
        'Not Applicable',
    ];

    constructor(
        private fb: FormBuilder,
        private auditQuestionService: AuditQuestionService,
        private snackbarService: SnackbarService,
        private auditService: AuditService,
    ) {}

    ngOnInit(): void {
        const disabled = this.status?.id !== 5;
        this.questionForm = this.fb.group({
            questions: this.fb.array(
                this.questions.map((q) =>
                    this.fb.group({
                        id: [q.id],
                        question_text: [{ value: q.question_text, disabled }],
                        compliance: [{ value: q.compliance, disabled }],
                        observations: [{ value: q.observations, disabled }],
                    })
                )
            ),
        });
        this.validateAllAnswered();
    }
    get editingEnabled(): boolean {
        return this.status?.id === 4;
    }
    get questionsFA(): FormArray {
        return this.questionForm.get('questions') as FormArray;
    }
    setCompliance(index: number, value: string): void {
        const fg = this.questionsFA.at(index) as FormGroup;
        const current = fg.value.compliance;

        // Si el valor actual es el mismo al que el usuario hizo clic, lo desmarca
        const newValue = current === value ? null : value;

        // Si no hay cambio, no se hace nada
        if (current === newValue) {
            return;
        }
        fg.patchValue({ compliance: value });
        const payload = { id: fg.value.id, compliance: newValue };
        this.auditQuestionService.updateQuestion(payload).subscribe({
            next: () => {

                this.snackbarService.showCustom(
                    'Cumplimiento actualizado',
                    3000,
                    'info'
                )
                this.validateAllAnswered();
            },

            error: () =>
                this.snackbarService.showCustom(
                    'Error al actualizar',
                    3000,
                    'error'
                ),
        });
    }

    onObservationsBlur(index: number): void {
        const fg = this.questionsFA.at(index) as FormGroup;

        if (!fg.dirty) {
            return;
        }
        const payload = {
            id: fg.value.id,
            observations: fg.value.observations,
        };

        this.auditQuestionService.updateQuestion(payload).subscribe({
            next: () =>
                this.snackbarService.showCustom(
                    'Cumplimiento actualizado',
                    3000,
                    'info'
                ),
            error: () =>
                this.snackbarService.showCustom(
                    'Error al actualizar',
                    3000,
                    'error'
                ),
        });
    }

    startAudit(): void {
        if (!this.status) return;
        this.loading = true;

        this.auditService.updateAuditStatus(this.auditId, 4).subscribe({
            next: () => {
                this.snackbarService.showCustom(
                    'Estado auditoria actualizado',
                    3000,
                    'info'
                ),
                    (this.status.id = 4); // cambia a “En ejecución”
                this.loading = false;
            },
            error: () => (this.loading = false),
        });
    }

    /* ───────────── Finalizar auditoría ─────────── */
    finishAudit(): void {
        if (!this.status) return;

        const allAnswered = this.questions.every((q) => !!q.compliance);
        if (!allAnswered) return; // bloqueo extra por seguridad

        this.loading = true;
        this.auditService.updateAuditStatus(this.auditId, 5).subscribe({
            next: () => {
                this.status.id = 5; // “Finalizada”
                this.loading = false;
            },
            error: () => (this.loading = false),
        });
    }
    validateAllAnswered(): void {
        this.allAnswered = this.questionsFA.controls.every((fg: AbstractControl) => {
            const val = fg.get('compliance')?.value;
            return val !== null && val !== undefined && val !== '';
        });
    }

    get isReadOnly(): boolean {
        return this.status?.id === 5; // Finalizada
    }

}
