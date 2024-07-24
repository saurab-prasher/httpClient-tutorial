import { Component } from '@angular/core';
import { ErrorService } from '../shared/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private errorService: ErrorService) {}
  error = this.errorService.error;
}
