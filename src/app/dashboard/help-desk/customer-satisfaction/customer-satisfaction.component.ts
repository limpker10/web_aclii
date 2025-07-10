import {Component, Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomerSatisfactionService } from './customer-satisfaction.service';
import {NgStyle} from "@angular/common";

@Component({
    selector: 'app-customer-satisfaction',
    imports: [MatCardModule, MatButtonModule, MatMenuModule, NgStyle],
    templateUrl: './customer-satisfaction.component.html',
    standalone: true,
    styleUrl: './customer-satisfaction.component.scss'
})
export class CustomerSatisfactionComponent {
    @Input() data: { status__name: string; total: number }[] = [];

    constructor(private satisfactionService: CustomerSatisfactionService) {}

    ngOnChanges(): void {
        if (this.data?.length > 0) {
            this.satisfactionService.loadChart(this.data);
        }
    }
    getColor(status: string): string {
        const colors: Record<string, string> = {
            'Por asignar': '#A9A9C8',
            'Asignada': '#3761EE',
            'En preparación': '#E4D4F6',
            'En progreso': '#5B5B98',
            'Concluida': '#4CAF50',
            'Requiere correcciones': '#DC9393',
            'Cerrada': '#D2DC93',
            'Reprogramar': '#F44336',
        };
        return colors[status] || '#999';
    }
}
