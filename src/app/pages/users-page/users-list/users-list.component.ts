import { NgIf } from '@angular/common';
import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule, MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {Usuario} from "../../../interfaces/users/usuario.interfaces";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {UserService} from "../../../services/user/user.service";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";

@Component({
    selector: 'app-users-list',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatSortModule],
    templateUrl: './users-list.component.html',
    standalone: true,
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements AfterViewInit{
    displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'email', 'dni', 'estado'];
    dataSource = new MatTableDataSource<Usuario>();

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

    readonly userService = inject(UserService)
    readonly snackbarService = inject(SnackbarService)


    ngOnInit(): void {
        this.loadUsers();
        // this.loadRoles();
        // this.loadAllUsersCombo();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadUsers(page: number = 1, pageSize: number = 10): void {
        this.userService.getUsers( page,  pageSize).subscribe({
            next: (data) => {
                this.dataSource.data = data.results;
                this.resultsLength = data.count;
                this.pageIndex = page - 1;
                this.pageSize = pageSize;
                this.isLoadingResults = false;
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
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

    openDialog(){

    }
}
