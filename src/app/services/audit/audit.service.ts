import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Audit,
    AuditApiResponse, AuditEdit,
    LaboratorioCombo,
} from '../../interfaces/audit/audit.interfaces';
import {ApiResponse} from "../../interfaces/users/usuario.interfaces";

@Injectable({
    providedIn: 'root',
})
export class AuditService {
    private baseUrl = `${environment.apiUrl}/sileii_services/audit/audits`;

    constructor(private http: HttpClient) {}

    createAudit(auditData: Audit): Observable<Audit> {
        return this.http.post<Audit>(this.baseUrl + '/', auditData);
    }

    getAuditById(id: number): Observable<AuditEdit> {
        return this.http.get<Audit>(`${this.baseUrl}/search/?id=${id}`);
    }

    getAuditByCode(code: string): Observable<Audit> {
        return this.http.get<Audit>(
            `${this.baseUrl}/search/?code=${code}`
        );
    }

    getAudits(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        return this.http.get<ApiResponse>(this.baseUrl, { params });
    }

    getAllAudits(url?: string): Observable<any> {
        const endpoint = url ? url : this.baseUrl;
        return this.http.get<any>(endpoint);
    }

    updateAudit(id: number, auditData: Partial<Audit>): Observable<Audit> {
        return this.http.put<Audit>(`${this.baseUrl}/${id}/update-status/`, auditData);
    }

    deleteAudit(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}/`);
    }
    updateAuditStatus(auditId: number, statusId: number) {
        return this.http.patch(
            `${this.baseUrl}/${auditId}/update-status/`,
            {
                status: statusId,
            }
        );
    }
}
