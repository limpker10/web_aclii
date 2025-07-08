import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LaboratorioCombo} from "../../interfaces/audit/audit.interfaces";
import {environment} from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class LaboratorioService {
    private baseUrl = `${environment.apiUrl}/sileii_services/laboratorio`;
    constructor(private http: HttpClient) {}

    getLaboratoriosCombo(): Observable<LaboratorioCombo[]> {
        return this.http.get<LaboratorioCombo[]>(`${this.baseUrl}/combo/`);
    }
}
