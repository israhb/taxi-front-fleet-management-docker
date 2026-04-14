import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MessageService, Message  } from 'primeng/api';

@Component({
  selector: 'app-c-dialog-upload-file',
  templateUrl: './c-dialog-upload-file.component.html',
  styleUrl: './c-dialog-upload-file.component.scss',
  providers: [MessageService]
})
export class CDialogUploadFileComponent {

    messageService = inject(MessageService);

    @Input() modalUploadFile: boolean;
    @Input() model_data_title: string;
    @Input() messageArray: Message[];
    @Output() fileReturnEvent = new EventEmitter<File>();
    @Output() flagSuccessFileEvent = new EventEmitter<boolean>();
    @Output() flagClouseModalEvent = new EventEmitter<boolean>();

    fileData: File;

    onFileSelect(file: File) {
        this.fileData = file;
        this.messageArray = [];
        this.fileReturnEvent.emit(file);
    }

    clouseModal(){
        this.flagClouseModalEvent.emit(false);
    }

    setFileReturn(){
        if(this.fileData){
            this.flagSuccessFileEvent.emit(true);
        }else{
            this.flagSuccessFileEvent.emit(false);
        }
    }

}
