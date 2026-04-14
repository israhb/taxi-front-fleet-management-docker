import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ValidacionComponent } from './validacion.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: ValidacionComponent }
	])],
	exports: [RouterModule]
})
export class ValidacionRoutingModule { }
