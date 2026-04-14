import { Component, OnInit, inject } from '@angular/core';
import { MessageService, MenuItem, Message  } from 'primeng/api';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { ValidacionService } from 'src/app/demo/service/admin/validacion/validacion.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrl: './validacion.component.scss',
  providers: [MessageService]
})
export class ValidacionComponent implements OnInit {

    messageService      = inject(MessageService);
    carteraService      = inject(CarteraService);
    toolsService        = inject(ToolsService);
    validacionService   = inject(ValidacionService);

    //dialogs
    modalValidarRegistro: boolean;
    /********* TABLA ********************** */
    validacion: any;
    validaciones: any[];
    selectedValidaciones: any[];

    //Filtros
    form_filterG_model_fecha_de: string;
    form_filterG_model_fecha_a: string;
    form_filterG_model_region: number; form_filterG_option_region: any[];
    form_filterG_model_gerencia: number; form_filterG_option_gerencia: any[];
    form_filterG_model_cedi: number; form_filterG_option_cedi: any[];
    form_filterG_model_rutas: number; form_filterG_option_rutas: any[];
    form_filterG_model_estatus: string; form_filterG_options_estatus: any[];

    ///pagination
    totalRecords: number;
    page: number = 0;
    first: number = 0;
    rows: number = 15;

    //options map
    center: any;
    zoom: number;
    marker : any;

    form_model_foro_selected: string = 'https://c2.tmsglobal.com.mx/site/desarrolloMercado/img/img_no.jpg';

    //campos validados
    submitValidado: boolean;
    messagesValidate: Message[];
    form_model_validado_validado: number; form_options_validado_validado = [
        { i: 1, d: 'Si' },
        { i: 2, d: 'No' }
    ];
    form_model_validado_comentario: string; form_options_validado_comentario = [
        {i: 1,  d: 'Mal Documentado'},
        {i: 2,  d: 'Sin Foto'},
        {i: 3,  d: 'Semaforo'}
    ];

    ngOnInit(): void {
        this.form_filterG_model_fecha_de = this.toolsService.formatDateNow();
        this.form_filterG_model_fecha_a = this.toolsService.formatDateNow();
        this.selectores();
        this.runFilterGeneric();
    }

    onPageChange(data: any){
        this.page = data['page'];
        this.first = data['first'];
        this.rows = data['rows'];
        this.runFilterGeneric();
    }

    refreshTable(rutas?: string, date_fr?: string, date_to?: string){
        this.validacionService.getListadoValidacion(
            this.page, this.first, this.rows,
            this.form_filterG_model_region, this.form_filterG_model_gerencia,
            this.form_filterG_model_cedi, rutas, this.form_filterG_model_estatus,
            date_fr, date_to
        ).subscribe({
            next: (r) => {
                if(r && r['success']){
                    this.validaciones = this.toolsService.getGenerateNumeracionTables(r['rows']);
                    this.totalRecords = r['results'];
                }else{
                    this.validaciones = [];
                }
            },
            error: (r) => {
                this.validaciones = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            }
        });
    }

    runFilterGeneric(){
        let rutas = this.form_filterG_model_rutas ? this.form_filterG_model_rutas.toString() : '';
        let date_fr = this.form_filterG_model_fecha_de && this.form_filterG_model_fecha_de.length <= 10
        ? this.form_filterG_model_fecha_de
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_de, false, false);
        let date_to = this.form_filterG_model_fecha_a && this.form_filterG_model_fecha_a.length <= 10
        ? this.form_filterG_model_fecha_a
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_a, false, false);
        this.refreshTable(rutas, date_fr, date_to);
    }

    downloadCartera(){
        let rutas = this.form_filterG_model_rutas ? this.form_filterG_model_rutas.toString() : '';
        let date_fr = this.form_filterG_model_fecha_de && this.form_filterG_model_fecha_de.length <= 10
        ? this.form_filterG_model_fecha_de
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_de, false, false);
        let date_to = this.form_filterG_model_fecha_a && this.form_filterG_model_fecha_a.length <= 10
        ? this.form_filterG_model_fecha_a
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_a, false, false);

        this.validacionService.getDescargarValidacion(
            this.form_filterG_model_region, this.form_filterG_model_gerencia,
            this.form_filterG_model_cedi, rutas, this.form_filterG_model_estatus,
            date_fr, date_to
            ).subscribe({
            next: (r) => {
                var file = new Blob([r], {
                    type: 'text/csv;charset=utf-8'
                });
                this.toolsService.saveAsExcelFile(file, "Validacion Descarga");
            },
            error: (r) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un Error en el Servidor!!', life: 3000});
            }
        });

    }

    selectores(){
        if(!this.form_filterG_option_region){
            this.carteraService.getRegiones().subscribe({
                next: (r) => {
                    this.form_filterG_option_region = r;
                }
            });
        }
        if(!this.form_filterG_options_estatus){
            this.validacionService.getListadoEstatus().subscribe({
                next: (r) => {
                    this.form_filterG_options_estatus = this.toolsService.getPutJsonTodos(r);
                },
                error: (e) => {
                    console.log(e);
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
            }else{
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;
                this.carteraService.getGerencia(this.form_filterG_model_region).subscribe({
                    next: (r) => {
                        this.form_filterG_option_gerencia = this.toolsService.getPutJsonTodos(r);
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
            }else{
                if(this.form_filterG_model_gerencia != -1){
                    this.form_filterG_option_cedi = null;
                    this.form_filterG_model_cedi = null;
                    this.form_filterG_option_rutas = null;
                    this.form_filterG_model_rutas = null;
                    this.carteraService.getCedi(this.form_filterG_model_gerencia).subscribe({
                        next: (r) => {
                            this.form_filterG_option_cedi = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                }
            }
        }
        if(index === 2){
            if(!this.form_filterG_model_cedi){
                this.form_filterG_option_rutas = null;
                this.form_filterG_model_rutas = null;
            }else{
                if(this.form_filterG_model_cedi != -1){
                    this.form_filterG_option_rutas = null;
                    this.form_filterG_model_rutas = null;
                    this.carteraService.getRutasValidacion(this.form_filterG_model_cedi).subscribe({
                        next: (r) => {
                            this.form_filterG_option_rutas = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                }
            }
        }
    }

    onRowSelect(event: any) {
        let coordx = event['data']['valCar_coord_x'];
        let coordy = event['data']['valCar_coord_y'];
        this.form_model_foro_selected = event['data']['valCar_f1'];
        if(coordx && coordx != '' && coordy && coordx != ''){
            let jsonMap = {
                lat: parseFloat(coordy),
                lng: parseFloat(coordx)
            };
            this.center = jsonMap;
            this.zoom = 15;
            this.marker = {
                position: jsonMap
            };
        }else{
            this.zoom = 5;
            this.center= {
                lat: 19.424811,
                lng: -99.130039
            };
            this.marker = {};
        }
    }

    onRowDblClick(data: any){
        console.log({dobleclick: data});
        this.validacion = data;
        this.modalValidarRegistro = true;
    }

    resetCombo(){
        this.form_model_validado_comentario = this.form_model_validado_validado != 2 ? null
        : this.form_model_validado_comentario;
        this.messagesValidate = [];
    }

    saveValidate(){
        this.submitValidado = true;
        if(this.form_model_validado_validado){
            this.validacionService.setValidateRegister(this.validacion.valCar_id, this.form_model_validado_validado,
                this.form_model_validado_comentario ? this.form_model_validado_comentario : '' ).subscribe({
                next: (r) => {
                    //actualizo
                    console.log(r);
                    this.runFilterGeneric();
                    this.messagesValidate = [{ severity: 'success', summary: 'Completado!!', detail: 'Registro Actualziado!!' }];
                }
            });
        }else{
            this.messagesValidate = [{ severity: 'warn', summary: 'Error', detail: 'Faltan campos por seleccionar!!' }];
        }
    }

    clouseModalValidate(){
        this.modalValidarRegistro = false;
        this.submitValidado = false;
        this.form_model_validado_validado = null;
        this.form_model_validado_comentario = null;
    }
}
