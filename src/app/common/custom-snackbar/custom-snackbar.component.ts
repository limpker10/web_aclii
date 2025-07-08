import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [FeathericonsModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: 'success' | 'error' | 'info' }) {}

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-octagon';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }
}
