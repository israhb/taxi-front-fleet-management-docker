import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';
import { ReportePComponent } from './reporteP.component';
import { ReportePRoutingModule } from './reporteP-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ReportePRoutingModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [ReportePComponent],
    providers: [
      provideHttpClient(withInterceptors([spinnerInterceptor]))
    ],
})
export class ReportePModule { }
