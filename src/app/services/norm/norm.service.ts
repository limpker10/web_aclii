import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment.development";

import {ApiResponse} from "../../interfaces/users/usuario.interfaces";
import {Norm, NormItem, NormSubItem} from "../../interfaces/norm/norm.interfaces";

@Injectable({
    providedIn: 'root'
})
export class NormService {
    private baseUrl = `${environment.apiUrl}/sileii_services/audit`;

    constructor(private http: HttpClient) {}

    // Norms
    getNorms(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        return this.http.get<ApiResponse>(`${this.baseUrl}/norms/`, { params });
    }

    getNormsCombo(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/norms/combo/`);
    }


    getNormsParams(params?: any): Observable<Norm[]> {
        return this.http.get<Norm[]>(`${this.baseUrl}/norms/category/`, { params });
    }

    getNorm(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/norms/${id}/`);
    }

    createNorm(norm: Norm): Observable<Norm> {
        return this.http.post<Norm>(`${this.baseUrl}/norms/`, norm);
    }

    updateNorm(id: number, norm: Norm): Observable<Norm> {
        return this.http.put<Norm>(`${this.baseUrl}/norms/${id}/`, norm);
    }

    deleteNorm(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/norms/${id}/`);
    }

    // NormFile (Files related to Norm)
    uploadNormFile(normId: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('norm', normId.toString());
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.baseUrl}/norm-files/`, formData);
    }

    // Crear un norm-item
    createItem(item: any): Observable<NormItem> {
        return this.http.post<NormItem>(`${this.baseUrl}/norm-items/`, item);
    }

    updateItem(id: number, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/norm-items/${id}/`, data);
    }


    // Crear un norm-subitem
    createSubItem(subitem: any): Observable<NormSubItem> {
        return this.http.post<NormSubItem>(`${this.baseUrl}/norm-subitems/`, subitem);
    }

    // 🔁 Nuevo: Editar subítem existente por ID
    updateSubItem(id: number, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/norm-subitems/${id}/`, data);
    }

    // NormSubItemFile (Files related to Norm SubItem)
    uploadNormSubItemFile(subItemId: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<any>(`${this.baseUrl}/norm-sub-item-files/`, formData, {
            headers: new HttpHeaders(),
        });
    }

    getNormSubItemFiles(subItemId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/norm-sub-item-files/`, {
            params: { subitem: subItemId.toString() }
        });
    }

    // norm.service.ts
    deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/norm-items/${id}/`);
    }

    deleteSubItem(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/norm-subitems/${id}/`);
    }
}
