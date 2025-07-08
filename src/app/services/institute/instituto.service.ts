import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {InstitutoCombo, LaboratorioCombo} from "../../interfaces/audit/audit.interfaces";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

    private baseUrl = `${environment.apiUrl}/sileii_services/instituto`;
    constructor(private http: HttpClient) {}

    getInstitutosCombo(): Observable<InstitutoCombo[]> {
        return this.http.get<InstitutoCombo[]>(`${this.baseUrl}/combo/`);
    }
}
