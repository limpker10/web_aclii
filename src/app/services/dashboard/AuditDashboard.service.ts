import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";

export interface AuditCardData {
    total: number;
    finalized: number;
    in_progress: number;
    pending: number;
}

export interface DonutData {
    status__name: string;
    total: number;
}

export interface ReprogrammedAudit {
    id: number;
    code: string;
    date: string;
    status: string;
    auditor: string;
    coordinator: string;
    applicable_standard: string;
}

export interface AuditDashboardResponse {
    cards: AuditCardData;
    donut: DonutData[];
    reprogrammed_audits: ReprogrammedAudit[];
}

@Injectable({
    providedIn: 'root',
})
export class AuditDashboardService {
    private baseUrl = `${environment.apiUrl}/sileii_services/audit/dashboard/`;
    constructor(private http: HttpClient) {}

    getDashboardData(): Observable<AuditDashboardResponse> {
        return this.http.get<AuditDashboardResponse>(this.baseUrl);
    }
}
