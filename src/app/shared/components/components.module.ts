import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { CDialogPaswordComponent } from './c-dialog-pasword/c-dialog-pasword.component';
import { CDialogUploadFileComponent } from './c-dialog-upload-file/c-dialog-upload-file.component';
import { CDialogMassiveUpdateComponent } from './c-dialog-massive-update/c-dialog-massive-update.component';



@NgModule({
  declarations: [
    CDialogPaswordComponent,
    CDialogUploadFileComponent,
    CDialogMassiveUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    CDialogPaswordComponent,
    CDialogUploadFileComponent,
    CDialogMassiveUpdateComponent
  ]
})
export class ComponentsModule { }
