import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {AuditService} from "../../../services/audit/audit.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DatePipe} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-audit-list-coordinador',
    imports: [MatDialogModule, MatCardModule, MatInputModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatTooltipModule, MatFormFieldModule, MatSortModule, MatTooltipModule, DatePipe],
    templateUrl: './audit-list-coordinador.component.html',
    styleUrl: './audit-list-coordinador.component.scss',
    standalone: true,
})
export class AuditListCoordinadorComponent {
    displayedColumns: string[] = ['index', 'code', 'entity_type', 'coordinator', 'auditor', 'applicable_standard', 'status', 'created_at'];
    dataSource = new MatTableDataSource<any>();

    resultsLength = 0;
    isLoadingResults = true;
    pageIndex = 1;

    pageSize = 10;
    pageSizeOptions = [5, 10, 25];
    showFirstLastButtons = false;

    nextPageUrl: string | null = null;
    previousPageUrl: string | null = null;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    readonly auditService = inject(AuditService)
    readonly snackbarService = inject(SnackbarService)
    readonly router = inject(Router)


    ngOnInit(): void {
        this.loadUsers();
        // this.loadRoles();
        // this.loadAllUsersCombo();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    edit(element: any): void {
        this.router.navigate(['/audits/audit-edit', element.id]);
    }

    delete(element: any): void {
        if (!element?.id) return;

    }

    loadUsers(page: number = 1, pageSize: number = 10): void {
        this.isLoadingResults = true;

        /* 1. Leer y parsear el perfil guardado en localStorage */
        const profileJson = localStorage.getItem('user_profile');
        if (!profileJson) {
            console.error('user_profile no encontrado en localStorage');
            this.isLoadingResults = false;
            return;
        }

        const { id: userId } = JSON.parse(profileJson);   // ← sacamos solo el id

        /* 2. Llamar al endpoint filtrado */
        this.auditService.getAuditsByUser(page, pageSize, userId).subscribe({
            next: data => {
                this.dataSource.data = data.results;
                this.resultsLength   = data.count;
                this.pageIndex       = page - 1;
                this.pageSize        = pageSize;
                this.isLoadingResults = false;
            },
            error: err => {
                console.error('Error al cargar auditorías:', err);
                this.isLoadingResults = false;
            }
        });
    }


    handlePageEvent(event: PageEvent): void {
        const goingForward = event.pageIndex > (event.previousPageIndex ?? 0);
        const goingBackward = event.pageIndex < (event.previousPageIndex ?? 0);

        // Si cambia el tamaño de página
        if (event.pageSize !== this.pageSize) {
            this.pageSize = event.pageSize;
            this.pageIndex = 0; // reiniciar al inicio (opcional)
            this.loadUsers(1, this.pageSize); // DRF usa index desde 1
            return;
        }

        this.pageIndex = event.pageIndex;
        const backendPage = this.pageIndex + 1;
        this.loadUsers(backendPage, this.pageSize);
    }

    details(element: any): void {
        this.router.navigate(['/audits/audit-details', element.code], {state: {audit: element}});
    }

    execution(element: any): void {
        this.router.navigate(['/audits/audit-execution', element.code], {state: {audit: element}});
    }

    isEditingDisabled(statusId: number): boolean {
        return [4, 5, 6, 7].includes(statusId);
    }

    isExecutionDisabled(statusId: number): boolean {
        return statusId === 8;
    }
}
