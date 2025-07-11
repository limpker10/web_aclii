import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-users-page',
    imports: [RouterOutlet],
    templateUrl: './users-page.component.html',
    standalone: true,
    styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {}
