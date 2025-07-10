import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {FeathericonsModule} from "../../../../icons/feathericons/feathericons.module";
import {DatePipe, TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-user-bio:not(1)',
    imports: [MatCardModule, FeathericonsModule, TitleCasePipe, DatePipe],
    templateUrl: './user-bio.component.html',
    standalone: true,
    styleUrl: './user-bio.component.scss'
})
export class UserBioComponent {
    @Input() code!: string;
    @Input() status!: string;
    @Input() auditor!: any | null;
    @Input() coordinator!: any | null;
    @Input() entityType!: string;
    @Input() entityId!: number;
    @Input() date!: string;
    @Input() standardTitle!: string;
    @Input() standardCode!: string;

}
