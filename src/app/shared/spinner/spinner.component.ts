import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="isLoading$ | async" class="overlaySpinner">
      <div class="centerSpinner">
        <p-progressSpinner [style]="{ 'width.px': 50, 'height.px': 50 }" strokeWidth="4"></p-progressSpinner>
      </div>
    </div>
  `,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

    isLoading$ = this.spinnerService.isLoading$;
    constructor(private readonly spinnerService: SpinnerService) {}

}
