import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuditService} from "../../../services/audit/audit.service";
import {UserBioComponent} from "./user-bio/user-bio.component";
import {NewsfeedComponent} from "./newsfeed/newsfeed.component";
import {FriendsComponent} from "./friends/friends.component";
import {audit} from "rxjs";

@Component({
    selector: 'app-audit-details',
    imports: [UserBioComponent, FriendsComponent, NewsfeedComponent],
    templateUrl: './audit-details.component.html',
    standalone: true,
    styleUrl: './audit-details.component.scss'
})
export class AuditDetailsComponent {
    audit: any;
    code: string = "";
    selectedSubitemId: number | null = null;
    selectedSubitemName: string | null = null;

    constructor(private route: ActivatedRoute, private auditService: AuditService) {}

    ngOnInit(): void {
        this.code = this.route.snapshot.paramMap.get('code')!;
        if (!this.audit) {
            this.loadAuditByCode(this.code);
        }
    }

    loadAuditByCode(code: string): void {
        this.auditService.getAuditByCode(code).subscribe({
            next: (res) => {
                this.audit = res;
                console.log(this.audit)
            },
            error: (err) => {
                console.error('No se encontró la auditoría:', err);
            }
        });
    }

    onSubitemSelected(subitem: { id: number; name: string }): void {
        this.selectedSubitemId = subitem.id;
        this.selectedSubitemName = subitem.name;
    }

}
