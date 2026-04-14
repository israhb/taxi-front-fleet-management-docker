import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { spinnerInterceptor } from 'src/app/shared/spinner/spinner.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [UsuariosComponent],
  providers: [
    provideHttpClient(withInterceptors([spinnerInterceptor]))
  ],
})
export class UsuariosModule { }
