import { Component } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import {Router, RouterLink} from '@angular/router';
import { ToggleService } from './toggle.service';

@Component({
    selector: 'app-header',
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, NgClass],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    providers: [
        DatePipe
    ]
})
export class HeaderComponent {

    constructor(
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private router: Router
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.formattedDate = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    // Current Date
    currentDate: Date = new Date();
    formattedDate: any;

    logout(): void {
        localStorage.clear(); // Borra todo
        sessionStorage.clear(); // Si también usas esto
        this.router.navigate(['/authentication']); // Redirige
    }

}
