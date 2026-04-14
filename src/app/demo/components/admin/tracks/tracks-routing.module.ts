import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TracksComponent } from './tracks.component';

@NgModule({
	imports: [RouterModule.forChild([
        { path: '', component: TracksComponent }
	])],
	exports: [RouterModule]
})
export class TracksRoutingModule { }
