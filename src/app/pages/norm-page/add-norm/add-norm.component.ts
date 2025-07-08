import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NormService} from "../../../services/norm/norm.service";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";

@Component({
    selector: 'app-add-norm',
    imports: [
        ReactiveFormsModule, MatInputModule, MatButtonModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle,MatSelectModule, MatFormFieldModule
    ],
    templateUrl: './add-norm.component.html',
    standalone: true,
    styleUrl: './add-norm.component.scss'
})
export class AddNormComponent {
    categoryOptions = [
        { value: 'LAB', label: 'Laboratory' },
        { value: 'INS', label: 'Institute' }
    ];
    normForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private normService: NormService,
        private router: Router,
        private snackService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.normForm = this.fb.group({
            code: ['', Validators.required],
            organization: ['', Validators.required],
            title: ['', Validators.required],
            version_year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
            description: [''],
            about: [''],
            video_link: ['', [Validators.pattern('https?://.+')]],
            category: ['', Validators.required],
            status: [true]
        });
    }

    onSubmit(): void {
        if (this.normForm.valid) {
            console.log(this.normForm.value)
            this.normService.createNorm(this.normForm.value).subscribe({
                next: () => {
                    this.snackService.showCustom('Se creo nueva norma:',3000,"success")
                    this.router.navigate(['/norms'])
                },
                error: err => {
                    this.snackService.showCustom('Error al crear norma:',3000,"error")
                    console.error('Error al crear norma:', err)
                }
            });
        }
    }
}
