import {Component, Input, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {DatePipe} from "@angular/common";

export interface ReprogrammedAudit {
    code: string;
    date: string;
    auditor: string;
    coordinator: string;
    applicable_standard: string;
    status: string;
}

@Component({
    selector: 'app-agents-list',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, DatePipe],
    templateUrl: './agents-list.component.html',
    standalone: true,
    styleUrl: './agents-list.component.scss'
})
export class AgentsListComponent {
    @Input() set audits(value: ReprogrammedAudit[]) {
        this.dataSource.data = value;
    }

    displayedColumns: string[] = ['code', 'date', 'auditor', 'coordinator', 'standard', 'status'];
    dataSource = new MatTableDataSource<ReprogrammedAudit>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
