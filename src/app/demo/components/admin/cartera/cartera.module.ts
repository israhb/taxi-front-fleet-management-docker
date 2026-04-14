import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteraComponent } from './cartera.component';
import { CarteraRoutingModule } from './cartera-routing.module';
import { GoogleMapsModule  } from '@angular/google-maps';

import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    CarteraRoutingModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [CarteraComponent],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ],
})
export class CarteraModule { }
