import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CapenhComponent } from './capenh.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: CapenhComponent }
	])],
	exports: [RouterModule]
})
export class CapenhRoutingModule { }
