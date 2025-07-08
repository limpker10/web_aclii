import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuditQuestion } from '../../interfaces/audit/audit.interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuditQuestionService {
    private baseUrl = `${environment.apiUrl}/sileii_services/audit/audit-questions/`;
    private importUrl = `${environment.apiUrl}/sileii_services/audit/import/audit`;

    constructor(private http: HttpClient) {}

    // Obtener todas las preguntas de una auditoría específica
    getByAudit(auditId: number): Observable<AuditQuestion[]> {
        return this.http.get<AuditQuestion[]>(
            `${this.baseUrl}?audit=${auditId}`
        );
    }

    // Crear una nueva pregunta
    create(question: AuditQuestion): Observable<AuditQuestion> {
        return this.http.post<AuditQuestion>(this.baseUrl, question);
    }

    // (Opcional) Actualizar una pregunta existente
    update(
        id: number,
        question: Partial<AuditQuestion>
    ): Observable<AuditQuestion> {
        return this.http.put<AuditQuestion>(`${this.baseUrl}${id}/`, question);
    }

    // (Opcional) Eliminar una pregunta
    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}/`);
    }

    updateQuestion(payload: {
        id: number;
        compliance?: string | null
        observations?: string;
    }) {
        return this.http.patch(`${this.baseUrl}${payload.id}/`, payload);
    }

    uploadQuestionsAsJson(auditId: number, data: any[]): Observable<any> {
        const url = `${environment.apiUrl}/sileii_services/audit/import-json/audit/${auditId}/questions/`;
        return this.http.post(url, data);
    }
}
