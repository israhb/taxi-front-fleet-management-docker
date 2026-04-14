import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportePComponent } from './reporteP.component';
@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: ReportePComponent }
	])],
	exports: [RouterModule]
})
export class ReportePRoutingModule { }
