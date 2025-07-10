import {Component, inject} from '@angular/core';
import { AgentsListComponent } from './agents-list/agents-list.component';
import {StatCard, StatsComponent} from './stats/stats.component';
import { IssuesSummaryComponent } from './issues-summary/issues-summary.component';
import {SnackbarService} from "../../common/custom-snackbar/snackbar.service";
import {Router} from "@angular/router";
import {AuditDashboardService} from "../../services/dashboard/AuditDashboard.service";
import {CustomerSatisfactionComponent} from "./customer-satisfaction/customer-satisfaction.component";
import {MatCard} from "@angular/material/card";

@Component({
    selector: 'app-help-desk',
    imports: [StatsComponent, AgentsListComponent, CustomerSatisfactionComponent, MatCard],
    templateUrl: './help-desk.component.html',
    standalone: true,
    styleUrl: './help-desk.component.scss'
})
export class HelpDeskComponent {
    stats: StatCard[] = [];
    donutData: { status__name: string; total: number }[] = [];
    reprogrammedAudits: any[] = [];

    readonly auditDashboardService = inject(AuditDashboardService)
    readonly snackbarService = inject(SnackbarService)
    readonly router = inject(Router)

    ngOnInit(): void {
        this.loadDataDashboard();
    }

    loadDataDashboard(): void {
        this.auditDashboardService.getDashboardData().subscribe({
            next: (data) => {
                console.log(data)
                const cards = data.cards;
                this.stats = [
                    {
                        icon: 'ri-ticket-line',
                        title: 'Total Auditorías',
                        value: cards.total,
                        subtitle: 'Auditorías registradas',
                        trend: '+0%', // puedes cambiarlo si haces comparativas
                        trendDirection: 'up',
                    },
                    {
                        icon: 'ri-game-line',
                        title: 'Finalizadas',
                        value: cards.finalized,
                        subtitle: 'Estado: Concluida',
                        trend: '+0%',
                        trendDirection: 'up',
                    },
                    {
                        icon: 'ri-arrow-left-right-line',
                        title: 'En Progreso',
                        value: cards.in_progress,
                        subtitle: 'Estado: En ejecución',
                        trend: '-0%',
                        trendDirection: 'down',
                    },
                    {
                        icon: 'ri-list-check-3',
                        title: 'Pendientes',
                        value: cards.pending,
                        subtitle: 'Aún por ejecutar',
                        trend: '+0%',
                        trendDirection: 'up',
                    },
                ];
                // 2. Donut chart data
                this.donutData = data.donut;

                // 3. Auditorías reprogramadas
                this.reprogrammedAudits = data.reprogrammed_audits;
            },
            error: (error) => {
                this.snackbarService.showCustom("ocurrio un error",3000,"error")
                console.error('Error al cargar usuarios:', error);
            }
        });
    }

}
