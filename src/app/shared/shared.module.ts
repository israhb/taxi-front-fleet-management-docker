import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerInterceptor } from './spinner/spinner.interceptor';
import { PrimengModule } from './dependencies/primeng/primeng.module';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    PrimengModule
  ],
  exports: [
    SpinnerComponent,
    PrimengModule
  ],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ],
})
export class SharedModule { }
