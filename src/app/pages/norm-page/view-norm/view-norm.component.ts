import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Norm} from "../norm-stepper/norm-stepper.component";
import {NormService} from "../../../services/norm/norm.service";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-view-norm',
    imports: [MatCardModule, MatChipsModule, MatExpansionModule, MatListModule, MatIcon, DatePipe],
    templateUrl: './view-norm.component.html',
    standalone: true,
    styleUrl: './view-norm.component.scss'
})
export class ViewNormComponent {
    private router = inject(ActivatedRoute);
    private normService = inject(NormService);
    norm?: Norm;

    ngOnInit(): void {
        const idParam = this.router.snapshot.paramMap.get('id');
        if (idParam) {
            this.loadNorms(+idParam);
        }
    }

    private loadNorms(id: number): void {
        this.normService.getNormById(id).subscribe({
            next:  (data) => this.norm = data,
            error: (err)  => console.error('Error al cargar norma:', err)
        });
    }
}
