import {Component, input, Input, OnChanges, output, Output, SimpleChanges} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {NgClass} from "@angular/common";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {Item} from "../../../norm-page/norm-stepper/norm-stepper.component";

@Component({
    selector: 'app-friends',
    imports: [MatCardModule, NgClass, MatExpansionModule, MatDividerModule, MatIconModule],
    templateUrl: './friends.component.html',
    standalone: true,
    styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnChanges {
    public items = input.required<Item[]>();
    public subitemSelected = output<{ id: number, name: string }>();
    selectedSubitemId: number | null = null;

    ngOnInit(): void {
        // this.trySelectFirstSubitem(); // ✅ emite automáticamente al inicializar
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'] && this.items?.length > 0) {
            this.trySelectFirstSubitem();
        }
    }
    private trySelectFirstSubitem(): void {
        const firstSubitem = this.items().find(i => i.subitems.length > 0)?.subitems[0];
        if (firstSubitem && firstSubitem.id != null && firstSubitem.id !== this.selectedSubitemId) {
            this.selectedSubitemId = firstSubitem.id;
            this.subitemSelected.emit({ id: firstSubitem.id, name: firstSubitem.name });
        }
    }

    selectSubitem(subitemId: number): void {
        const subitem = this.items().flatMap(i => i.subitems).find(s => s.id === subitemId);
        if (subitem && subitem.id != null && subitem.name != null) {
            this.selectedSubitemId = subitem.id;
            this.subitemSelected.emit({ id: subitem.id, name: subitem.name });
        }
    }

    isSelected(subitemId: number): boolean {
        return this.selectedSubitemId === subitemId;
    }

    protected readonly encodeURIComponent = encodeURIComponent;
}
