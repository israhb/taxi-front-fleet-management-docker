import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReportesComponent } from './reportes.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';



@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [ReportesComponent],
    providers: [
      provideHttpClient(withInterceptors([spinnerInterceptor]))
    ],
})
export class ReportesModule { }
