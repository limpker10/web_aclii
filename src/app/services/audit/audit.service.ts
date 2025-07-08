import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Audit,
    AuditApiResponse, AuditEdit,
    LaboratorioCombo,
} from '../../interfaces/audit/audit.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuditService {
    private baseUrl = `${environment.apiUrl}/sileii_services/audit`;

    constructor(private http: HttpClient) {}

    createAudit(auditData: Audit): Observable<Audit> {
        return this.http.post<Audit>(`${this.baseUrl}/audits/`, auditData);
    }

    getAuditById(id: number): Observable<AuditEdit> {
        return this.http.get<Audit>(`${this.baseUrl}/audits/search/?id=${id}`);
    }

    getAuditByCode(code: string): Observable<Audit> {
        return this.http.get<Audit>(
            `${this.baseUrl}/audits/search/?code=${code}`
        );
    }

    getAllAudits(url?: string): Observable<any> {
        const endpoint = url ? url : this.baseUrl;
        return this.http.get<any>(endpoint);
    }

    updateAudit(id: number, auditData: Partial<Audit>): Observable<Audit> {
        return this.http.put<Audit>(`${this.baseUrl}/audits/${id}/`, auditData);
    }

    deleteAudit(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/audits/${id}/`);
    }
    updateAuditStatus(auditId: number, statusId: number) {
        return this.http.patch(
            `${this.baseUrl}/audits/${auditId}/update-status/`,
            {
                status: statusId,
            }
        );
    }
}
