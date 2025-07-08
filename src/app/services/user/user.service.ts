import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../interfaces/auth/auth.interfaces";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment.development";
import {ApiResponse} from "../../interfaces/users/usuario.interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private baseUrl = `${environment.apiUrl}/sileii_services/audit/usuarios-sileii`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.http.get<User[] >(this.baseUrl);
    }

    getAllUserCombo(): Observable<User[]> {
        return this.http.get<User[] >(this.baseUrl+'all-users/');
    }

    getAllAuditors(): Observable<User[]> {
        return this.http.get<User[] >(`${this.baseUrl}?rol_id=2`);
    }
    getAllAuditorsInternal(): Observable<User[]> {
        return this.http.get<User[] >(`${this.baseUrl}?rol_id=3`);
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}${id}/`);
    }

    create(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.baseUrl, user);
    }

    update(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}${id}/`, user);
    }

    updateRol(id: number, rolId: number): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}${id}/actualizar-rol/`, { rol: rolId });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${id}/`);
    }

    getUsers(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        return this.http.get<ApiResponse>(this.baseUrl, { params });
    }
}
