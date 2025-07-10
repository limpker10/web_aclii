import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../interfaces/auth/auth.interfaces";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment.development";
import {ApiResponse} from "../../interfaces/users/usuario.interfaces";
import {LaboratorioCombo} from "../../interfaces/audit/audit.interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = `${environment.apiUrl}/sileii_services/audit/usuarios-sileii`;

    constructor(private http: HttpClient) {}

    getUsers(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        return this.http.get<ApiResponse>(this.baseUrl, { params });
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + '/', user);
    }


    getAuditorsCombo(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/combo/`);
    }


}
