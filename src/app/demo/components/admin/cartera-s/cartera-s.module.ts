import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteraSComponent } from './cartera-s.component';

import { CarteraSRoutingModule } from './cartera-s-routing.module'; 
import { GoogleMapsModule  } from '@angular/google-maps';

import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [CarteraSComponent],
  imports: [
    CommonModule,
    CarteraSRoutingModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ]
})
export class CarteraSModule { }
