import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidacionRoutingModule } from './validacion-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ValidacionComponent } from './validacion.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';



@NgModule({
  imports: [
    CommonModule,
    ValidacionRoutingModule,
    GoogleMapsModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [ValidacionComponent],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ],
})
export class ValidacionModule { }
