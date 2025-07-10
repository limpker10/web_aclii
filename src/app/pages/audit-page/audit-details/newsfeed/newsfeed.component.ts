import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {FeathericonsModule} from "../../../../icons/feathericons/feathericons.module";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuditQuestion} from "../../../../interfaces/audit/audit.interfaces";
import {AuditQuestionService} from "../../../../services/audit/audit-question.service";
import {SnackbarService} from "../../../../common/custom-snackbar/snackbar.service";
import {MatTooltip} from "@angular/material/tooltip";
import * as XLSX from 'xlsx';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-newsfeed',
    imports: [MatIconModule, MatMenuModule, MatButtonModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, ReactiveFormsModule, MatTooltip, FormsModule],
    templateUrl: './newsfeed.component.html',
    standalone: true,
    styleUrl: './newsfeed.component.scss'
})
export class NewsfeedComponent implements OnChanges{
    questionForm!: FormGroup;
    selectedFile!: File ;
    parsedQuestions: any[] = [];

    @Input() auditId!: number;
    @Input() questions: AuditQuestion[] = [];
    @Input() subitemId!: number | null;
    @Input() subitemName!: string | null;

    filteredQuestions: AuditQuestion[] = [];
    complianceOptions: string[] = ['Complies', 'Does Not Comply', 'Not Applicable'];

    constructor(
        private fb: FormBuilder,
        private auditQuestionService: AuditQuestionService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.questionForm = this.fb.group({
            question_text: ['', Validators.required]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['subitemId'] && this.subitemId !== null) {
            console.log('Nuevo subitemId recibido:', this.subitemId);
            this.filterQuestions();
        }

        if (changes['questions']) {
            console.log('Nuevas preguntas detectadas');
            this.filterQuestions();
        }
    }

    filterQuestions(): void {
        if (!this.subitemId) {
            this.filteredQuestions;
            return;
        }
        if (this.questionForm.invalid || !this.subitemId) {
            return;
        }
        this.filteredQuestions = this.questions.filter((q) => {
            return q.norm_subitem === this.subitemId;
        });
        console.log("questions",this.questions)
    }

    sendQuestion(): void {
        if (this.questionForm.invalid || !this.subitemId) {
            return;
        }

        const payload: AuditQuestion = {
            audit: this.auditId,
            question_text: this.questionForm.value.question_text,
            compliance: null,
            observations: null,
            supporting_document: null,
            norm_subitem: this.subitemId
        };
        console.log('Payload enviado:', payload);

        this.auditQuestionService.create(payload).subscribe({
            next: (res) => {
                console.log('Pregunta enviada', res);
                this.snackbarService.showCustom("Pregunta enviada", 3000, "success");
                this.questions.push(res); // actualiza el array base
                this.filterQuestions();   // vuelve a aplicar el filtro
                this.questionForm.reset();
            },
            error: (err) => console.error('Error enviando pregunta', err)
        });
    }

    editQuestion(question: AuditQuestion): void {

    }

    deleteQuestion(question: AuditQuestion): void {

    }

    updateCompliance(question: AuditQuestion, compliance: string): void {


    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            this.parsedQuestions = XLSX.utils.sheet_to_json(sheet);

            console.log('Preguntas parseadas:', this.parsedQuestions);
        };

        reader.readAsArrayBuffer(this.selectedFile);
    }
    uploadFile() {
        if (!this.parsedQuestions || this.parsedQuestions.length === 0) {
            console.warn('No se ha cargado o parseado ningún archivo.');
            return;
        }

        this.auditQuestionService.uploadQuestionsAsJson(this.auditId, this.parsedQuestions)
            .subscribe({
                next: (res) => console.log('Importación exitosa:', res),
                error: (err) => console.error('Error al importar:', err)
            });
    }

}
