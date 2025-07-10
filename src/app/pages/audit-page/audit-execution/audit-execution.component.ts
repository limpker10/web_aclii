import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from '../../../services/audit/audit.service';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { CardInfoComponent } from './card-info/card-info.component';

@Component({
    selector: 'app-audit-execution',
    standalone: true,
    imports: [CardInfoComponent, NewsfeedComponent],
    templateUrl: './audit-execution.component.html',
    styleUrl: './audit-execution.component.scss'
})
export class AuditExecutionComponent implements OnInit {
    audit: any = null;
    code: string = '';
    loading = true;
    selectedSubitemId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private auditService: AuditService
    ) {}

    ngOnInit(): void {
        const paramCode = this.route.snapshot.paramMap.get('code');
        if (paramCode) {
            this.code = paramCode;
            this.loadAuditByCode(this.code);
        } else {
            console.warn('No se recibió el parámetro "code"');
        }
    }

    loadAuditByCode(code: string): void {
        this.auditService.getAuditByCode(code).subscribe({
            next: (res) => {
                this.audit = res;
                this.loading = false;
                console.log('[Audit Cargada]', this.audit);
            },
            error: (err) => {
                this.loading = false;
                console.error('❌ No se encontró la auditoría:', err);
            }
        });
    }

    onSubitemSelected(subitemId: number): void {
        console.log('🧩 Subitem seleccionado:', subitemId);
        this.selectedSubitemId = subitemId;
    }
}
