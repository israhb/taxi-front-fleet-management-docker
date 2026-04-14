import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';
import { CapenhComponent } from './capenh.component';
import { CapenhRoutingModule } from './capenh-routing.module';



@NgModule({
  declarations: [CapenhComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    CapenhRoutingModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ],
})
export class CapenhModule { }
