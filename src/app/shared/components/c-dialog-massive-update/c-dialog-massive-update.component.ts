import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MessageService, Message  } from 'primeng/api';

@Component({
  selector: 'app-c-dialog-massive-update',
  templateUrl: './c-dialog-massive-update.component.html',
  styleUrl: './c-dialog-massive-update.component.scss',
  providers: [MessageService]
})
export class CDialogMassiveUpdateComponent {

    messageService = inject(MessageService);

    @Input() modalCambiosMasivos: boolean;
    @Input() form_data_succes_masive: string;
    @Input() messageArray: Message[];
    @Output() fileReturnMassiveEvent = new EventEmitter<File>();
    @Output() flagSuccessMassiveFileEvent = new EventEmitter<boolean>();
    @Output() flagClouseModalMassiveEvent = new EventEmitter<boolean>();

    fileData: File;

    onFileSelect(file: File) {
        this.fileData = file;
        this.messageArray = [];
        this.fileReturnMassiveEvent.emit(file);
    }

    clouseModal(){
        this.flagClouseModalMassiveEvent.emit(false);
    }

    getCambiosMasivos(){
        if(this.fileData){
            this.flagSuccessMassiveFileEvent.emit(true);
        }else{
            this.flagSuccessMassiveFileEvent.emit(false);
        }
    }

}
