import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarteraSComponent } from './cartera-s.component'; 

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: CarteraSComponent }
	])],
	exports: [RouterModule]
})
export class CarteraSRoutingModule { }