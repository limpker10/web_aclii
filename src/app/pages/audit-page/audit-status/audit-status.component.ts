import { Component } from '@angular/core';
import {AuditStatusService} from "../../../services/audit/audit-status.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-audit-status',
    imports: [],
    templateUrl: './audit-status.component.html',
    standalone: true,
    styleUrl: './audit-status.component.scss'
})
export class AuditStatusComponent {
    statusForm: FormGroup;

    constructor(private fb: FormBuilder, private statusService: AuditStatusService) {
        this.statusForm = this.fb.group({
            name: [''],
            description: ['']
        });
    }

    onSubmit(): void {
        const formData = this.statusForm.value;

        this.statusService.create(formData).subscribe({
            next: res => {
                alert('Estado creado correctamente');
                this.statusForm.reset();
            },
            error: err => console.error(err)
        });
    }
}
