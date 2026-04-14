import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GruposComponent } from './grupos.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: GruposComponent }
	])],
	exports: [RouterModule]
})
export class GruposRoutingModule { }
