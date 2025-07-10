import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {NgClass} from "@angular/common";

export interface StatCard {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
    trend: string;
    trendDirection: 'up' | 'down';
}

@Component({
    selector: 'app-stats',
    imports: [MatCardModule, NgClass],
    templateUrl: './stats.component.html',
    standalone: true,
    styleUrl: './stats.component.scss'
})
export class StatsComponent {
    @Input() stats: StatCard[] = [];
}
