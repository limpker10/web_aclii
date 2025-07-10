import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {DatePipe, TitleCasePipe} from "@angular/common";
import {FeatherModule} from "angular-feather";

@Component({
    selector: 'app-card-info',
    imports: [
        DatePipe,
        FeatherModule,
        MatCardModule,
        TitleCasePipe
    ],
    templateUrl: './card-info.component.html',
    standalone: true,
    styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
    @Input() code!: string;
    @Input() status!: string;
    @Input() auditor!: string | null;
    @Input() coordinator!: string | null;
    @Input() entityType!: string;
    @Input() entityId!: number;
    @Input() date!: string;
    @Input() standardTitle!: string;
    @Input() standardCode!: string;

}
