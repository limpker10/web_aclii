import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rol, RolApiResponse} from "../../interfaces/auth/auth.interfaces";

@Injectable({
  providedIn: 'root'
})
export class RolService {

    private baseUrl = `${environment.apiUrl}/sileii_services/rol/`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<RolApiResponse> {
        return this.http.get<RolApiResponse>(this.baseUrl);
    }

    getById(id: number): Observable<Rol> {
        return this.http.get<Rol>(`${this.baseUrl}/${id}/`);
    }

    create(rol: Rol): Observable<Rol> {
        return this.http.post<Rol>(this.baseUrl, rol);
    }

    update(id: number, rol: Rol): Observable<Rol> {
        return this.http.put<Rol>(`${this.baseUrl}/${id}/`, rol);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}/`);
    }
}
