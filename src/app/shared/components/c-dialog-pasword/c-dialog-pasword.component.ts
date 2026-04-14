import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MessageService, Message  } from 'primeng/api';

@Component({
  selector: 'app-c-dialog-pasword',
  templateUrl: './c-dialog-pasword.component.html',
  styleUrl: './c-dialog-pasword.component.scss',
  providers: [MessageService]
})
export class CDialogPaswordComponent implements OnInit{

    messageService = inject(MessageService);

    @Input() modalPasswordValidate: boolean;
    @Output() closeModalEvent = new EventEmitter<boolean>();
    @Output() successPasswordEvent = new EventEmitter<boolean>();

    messagesPassword: Message[];
    form_get_password: string;

    ngOnInit(): void {
        console.log({abreModal: this.modalPasswordValidate});
    }

    getValidarPassword(){
        if(this.form_get_password && this.form_get_password != ''){
            if(this.form_get_password === 'gepp2024'){
                this.messagesPassword = [];
                this.form_get_password = '';
                this.successPasswordEvent.emit(true);
                this.closeModalEvent.emit(false);
            }else{
                this.messagesPassword = [{ severity: 'warn', summary: 'Error', detail: 'Contraseña Incorrecta' }];
                this.successPasswordEvent.emit(false);
            }
        }else{
            this.messagesPassword = [{ severity: 'warn', summary: 'Error', detail: 'Contraseña Incorrecta' }];
            this.successPasswordEvent.emit(false);
        }
    }

    clouseModal(){
        this.form_get_password = '';
        this.closeModalEvent.emit(false);
    }

}
