import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {AuditStatus} from "../../interfaces/audit/audit.interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuditStatusService {

    private baseUrl = `${environment.apiUrl}/sileii_services/audit`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<AuditStatus[]> {
        return this.http.get<AuditStatus[]>(this.baseUrl);
    }

    getById(id: number): Observable<AuditStatus> {
        return this.http.get<AuditStatus>(`${this.baseUrl}/${id}/`);
    }

    create(status: AuditStatus): Observable<AuditStatus> {
        return this.http.post<AuditStatus>(this.baseUrl, status);
    }

    update(id: number, status: AuditStatus): Observable<AuditStatus> {
        return this.http.put<AuditStatus>(`${this.baseUrl}/${id}/`, status);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}/`);
    }
}
