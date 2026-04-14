import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem, Message  } from 'primeng/api';
import { Cartera } from 'src/app/demo/api/models/admin/cartera/Cartera';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { GruposService } from 'src/app/demo/service/admin/grupos/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class GruposComponent implements OnInit {


    /********* TABLA ********************** */
    cartera: Cartera;
    carteras: Cartera[];
    //Dialogs
    modalCargarDiaria: boolean;
    //
    form_filterG_model_region: number; form_filterG_option_region: any[];
    form_filterG_model_gerencia: number; form_filterG_option_gerencia: any[];
    form_filterG_model_cedi: number; form_filterG_option_cedi: any[];
    form_filterG_model_rutas: number; form_filterG_option_rutas: any[];
    form_filterG_model_grupo: number; form_filterG_option_grupo: any[];

    totalRecords: number;
    page: number = 0;
    first: number = 0;
    rows: number = 15;

    messages: Message[];
    file: File;

    constructor(
        private messageService: MessageService,
        private carteraService:CarteraService,
        private toolsService:ToolsService,
        private gruposService: GruposService
    ) { }

    ngOnInit(): void {
        this.selectores();
        this.runFilterGeneric();
    }

    onPageChange(data: any){
        this.page = data['page'];
        this.first = data['first'];
        this.rows = data['rows'];
        this.runFilterGeneric();
    }

    refreshTable(rutas?: string){
        this.gruposService.getListadoGrupos(
            this.page, this.first, this.rows,
            this.form_filterG_model_cedi, rutas, this.form_filterG_model_grupo
            ).subscribe({
            next: (r) => {
                if(r && r['success']){
                    this.carteras = this.toolsService.getGenerateNumeracionTables(r['rows']);
                    this.totalRecords = r['results'];
                }else{
                    this.carteras = [];
                }
            },
            error: (r) => {
                this.carteras = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            }
        });
    }
    selectores(){
        if(!this.form_filterG_option_region ){
            this.carteraService.getRegiones().subscribe({
                next: (r) => {
                    this.form_filterG_option_region = r;
                }
            });
        }
    }
    selectedCombo(index: number){
        if(index === 0){
            if(!this.form_filterG_model_region){
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;

                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
                this.form_filterG_option_rutas = null;
                this.form_filterG_model_rutas = null;
                this.form_filterG_option_grupo = null;
                this.form_filterG_model_grupo = null;
            }else{
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;
                this.carteraService.getGerencia(this.form_filterG_model_region).subscribe({
                    next: (r) => {
                        this.form_filterG_option_gerencia = r;
                    }
                });
            }
        }
        if(index === 1){
            if(!this.form_filterG_model_gerencia){
                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
                this.form_filterG_option_rutas = null;
                this.form_filterG_model_rutas = null;
                this.form_filterG_option_grupo = null;
                this.form_filterG_model_grupo = null;
            }else{
                if(this.form_filterG_model_gerencia != -1){
                    this.form_filterG_option_cedi = null;
                    this.form_filterG_model_cedi = null;
                    this.form_filterG_option_rutas = null;
                    this.form_filterG_model_rutas = null;
                    this.form_filterG_option_grupo = null;
                    this.form_filterG_model_grupo = null;
                    this.carteraService.getCedi(this.form_filterG_model_gerencia).subscribe({
                        next: (r) => {
                            this.form_filterG_option_cedi = r;
                        }
                    });
                }
            }
        }
        if(index === 2){
            if(!this.form_filterG_model_cedi){
                this.form_filterG_option_rutas = null;
                this.form_filterG_model_rutas = null;
                //grupo
                this.form_filterG_option_grupo = null;
                this.form_filterG_model_grupo = null;
            }else{
                if(this.form_filterG_model_cedi != -1){
                    this.form_filterG_option_rutas = null;
                    this.form_filterG_model_rutas = null;
                    this.carteraService.getRutasGrupos(this.form_filterG_model_cedi).subscribe({
                        next: (r) => {
                            this.form_filterG_option_rutas = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                    //grupo
                    this.form_filterG_option_grupo = null;
                    this.form_filterG_model_grupo = null;
                    this.carteraService.getGrupos(this.form_filterG_model_cedi).subscribe({
                        next: (r) => {
                            this.form_filterG_option_grupo = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                }
            }
        }
    }
    runFilterGeneric(){
        let rutas = this.form_filterG_model_rutas ? this.form_filterG_model_rutas.toString() : '';
        this.refreshTable(rutas);
    }
    openCargarGrupos(){
        this.messages = [];
        this.modalCargarDiaria = true;
    }
    ///file component
    clouseModalUploadFile(data: any){
        this.modalCargarDiaria = data;
    }
    getFileData(file: File){
        this.file = file;
    }
    getSuccesModalUpload(data: boolean){
        if(data){
            this.gruposService.postCargarGrupos(this.file).subscribe({
                next: (r) => {
                    if(r['success']){
                        this.messages = [{ severity: 'success', summary: 'Exito!', detail: r['msg'] }];
                        this.runFilterGeneric();
                    }else{
                        this.messages = [{ severity: 'warn', summary: 'Error', detail: r['msg'] }];
                    }
                },
                error: (e) => {
                    console.log({error_data: e});
                    this.messages = [{ severity: 'warn', summary: 'Error', detail: e['error']['msg'] }];
                }
            });
        }else{
            this.messages = [{ severity: 'warn', summary: 'Error', detail: 'Adjunta un Archivo!!!' }];
        }
    }

    getFileMassiveData(file: File){
        this.file = file;
    }

}
