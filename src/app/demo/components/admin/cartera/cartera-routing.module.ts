import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarteraComponent } from './cartera.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: CarteraComponent }
	])],
	exports: [RouterModule]
})
export class CarteraRoutingModule { }
