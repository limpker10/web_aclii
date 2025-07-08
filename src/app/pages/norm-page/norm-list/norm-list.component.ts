import {Component, inject, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {Usuario} from "../../../interfaces/users/usuario.interfaces";
import {SnackbarService} from "../../../common/custom-snackbar/snackbar.service";
import {NormService} from "../../../services/norm/norm.service";

@Component({
    selector: 'app-norm-list',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, MatSortModule],
    templateUrl: './norm-list.component.html',
    standalone: true,
    styleUrl: './norm-list.component.scss'
})
export class NormListComponent {
    displayedColumns: string[] = ['id', 'code', 'organization', 'title', 'version_year', 'category','status'];
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

    readonly normService = inject(NormService)
    readonly snackbarService = inject(SnackbarService)


    ngOnInit(): void {
        this.loadNorms();
        // this.loadRoles();
        // this.loadAllUsersCombo();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadNorms(page: number = 1, pageSize: number = 10): void {
        this.normService.getNorms( page,  pageSize).subscribe({
            next: (data) => {
                console.log(data)
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
            this.loadNorms(1, this.pageSize); // DRF usa index desde 1
            return;
        }

        this.pageIndex = event.pageIndex;
        const backendPage = this.pageIndex + 1;
        this.loadNorms(backendPage, this.pageSize);
    }

    openDialog(){

    }
}
