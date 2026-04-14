import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, Message  } from 'primeng/api';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { GruposService } from 'src/app/demo/service/admin/grupos/grupos.service';
import { UsuariosService } from 'src/app/demo/service/admin/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit{

    /********* TABLA ********************** */
    usuario: any;
    usuarios: any[];
    selectUsuarios: any[];
    //Dialogs
    modalCargarUsuariosM: boolean;
    modalCambiosMasivosUsuarios: boolean;
    dialogDelete: boolean;
    modalAgregarUpdate: boolean;

    totalRecords: number;
    page: number = 0;
    first: number = 0;
    rows: number = 15;

    messages: Message[];
    file: File;

    ///filter
    filter_model_data_nombre: string;
    ///agregar o actualiar
    flagAddUpdate: boolean;
    flagSumbit: boolean;
    form_cierre_model_user: string;
    form_cierre_model_password: string;
    form_cierre_model_nombre: string;
    form_cierre_model_numero_empleado: string;
    form_cierre_model_region: number; form_cierre_option_region: any[];
    form_cierre_model_gerencia: number; form_cierre_option_gerencia: any[];
    form_cierre_model_cedi: number; form_cierre_option_cedi: any[];
    form_cierre_model_sexo: number; form_cierre_option_sexo = [
        {i: 1, d: 'Masculino'},
        {i: 0, d: 'Femenino'}
    ];
    form_cierre_model_tipo: string; form_cierre_option_tipo: any[];

    constructor(
        private messageService: MessageService,
        private carteraService:CarteraService,
        private toolsService:ToolsService,
        private gruposService: GruposService,
        private usuariosService:UsuariosService
    ) { }

    ngOnInit(): void {
        this.selectores();
        this.refreshTable();
    }

    onPageChange(data: any){
        this.page = data['page'];
        this.first = data['first'];
        this.rows = data['rows'];
        this.refreshTable();
    }

    refreshTable(){
        this.usuariosService.getListadoUsuarios(
            this.page, this.first, this.rows, this.filter_model_data_nombre
            ).subscribe({
            next: (r) => {
                if(r && r['success']){
                    this.usuarios = this.toolsService.getGenerateNumeracionTables(r['rows']);
                    this.totalRecords = r['results'];
                }else{
                    this.usuarios = [];
                }
            },
            error: (r) => {
                this.usuarios = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            }
        });
    }
    openCargarGrupos( flag: number ){
        this.messages = [];
        if( flag == 1 ){
            this.modalCargarUsuariosM = true;
        }
        if( flag == 2 ){
            this.modalCambiosMasivosUsuarios = true;
        }
    }
    ///file component
    clouseModalUploadFile(data: any){
        this.modalCargarUsuariosM = data;
        this.modalCambiosMasivosUsuarios = data;
    }
    getFileData(file: File){
        this.file = file;
    }
    getSuccesModalUpload(data: boolean){
        if(data){
            this.usuariosService.postCargarUsuariosMasivos(this.file).subscribe({
                next: (r) => {
                    console.log(r);
                    
                    this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Usuario creado correctamente!!', life: 3000});
                    this.modalCargarUsuariosM = false;
                    this.refreshTable();

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
    ///cambios masivos usuarios
    getSuccesModalUploadMassive( data: boolean ){
        if(data){
            this.usuariosService.postCambiosMasivosUsuarios(this.file).subscribe({
                next: (r) => {
                    this.messages = [{ severity: 'success', summary: 'Exito', detail: r['reg'] }];
                    this.refreshTable();
                },
                error: (e) => {
                    console.log({error_data: e});
                    this.messages = [{ severity: 'warn', summary: 'Error', detail: 'Error al cargar el archivo' }];
                }
            });
        }else{
            this.messages = [{ severity: 'warn', summary: 'Error', detail: 'Adjunta un Archivo!!!' }];
        }
    }

    getFileMassiveData(file: File){
        this.file = file;
    }

    abrirModalAddUpdate(row: any, flag: boolean){
        console.log(row);
        this.flagAddUpdate = flag;
        if(flag){//actualiza
            if(this.usuario){

                this.form_cierre_model_user = this.usuario.user_username;
                this.form_cierre_model_password = this.usuario.user_password;
                this.form_cierre_model_nombre = this.usuario.user_nombre_completo;
                this.form_cierre_model_numero_empleado = this.usuario.user_numero_empleado;
                this.form_cierre_model_sexo = parseInt(this.usuario.user_sexo_id);
                this.form_cierre_model_tipo = this.usuario.uid_level;
                this.form_cierre_model_region = this.usuario.uid_reg;
                this.form_cierre_model_gerencia = this.usuario.uid_ger;
                this.form_cierre_model_cedi = this.usuario.uid_cds;
                this.selectedComboCierreClean(0);
                this.selectedComboCierreClean(1);

                this.modalAgregarUpdate = true;
            }else{
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Seleccione un registro', life: 3000});
            }
        }else{
            this.modalAgregarUpdate = true;
        }
    }

    onRowSelect(event: any) {
        console.log(event['data']);
        this.usuario = event['data'];
    }

    deleteRegister(){
        if(this.usuario){
            this.dialogDelete = true;
        }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Seleccione un registro', life: 3000});
        }
    }

    getDeleteUser(){
        this.dialogDelete = false;
        this.usuariosService.getEliminarUsuario(this.usuario.user_id ).subscribe({
            next: (r) => {
                if(r && r['success']){
                    this.messageService.add({severity: 'success', summary: 'Completado!!', detail: 'Se elimino correctamente', life: 3000});
                    this.refreshTable();
                }
            },
            error: (r) => {
                this.usuario = null;
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error en el Servidor!!', life: 3000});
            }
        });
    }

    clouseDialogs(){
        this.dialogDelete = false;
        this.usuario = null;
    }

    getLayout(flag: number){
        if(flag === 1){
            window.open('https://tms-public-files.s3.us-west-2.amazonaws.com/csv-examples/desarrollo-mercado/cargar-cartera-diaria.csv', '_blank');
        }else if(flag === 2){
            window.open('https://tms-public-files.s3.us-west-2.amazonaws.com/csv-examples/desarrollo-mercado/cargar-cartera-semanal.csv', '_blank');
        }else if(flag === 3){
            window.open('https://c2.tmsglobal.com.mx/site/desarrolloMercado/dispatcher.php?c=users&cmd=getDownloadUsuarios&exec=self', '_blank');
        }
    }

    selectores(){
        if(!this.form_cierre_option_region){
            this.carteraService.getRegiones().subscribe({
                next: (r) => {
                    this.form_cierre_option_region = this.toolsService.getPutJsonTodos(r);
                }
            });
        }
        if(!this.form_cierre_option_tipo){
            this.carteraService.geNiveles().subscribe({
                next: (r) => {
                    this.form_cierre_option_tipo = r;
                }
            });
        }
    }

    selectedComboCierre(index: number){
        if(index === 0){
            if(!this.form_cierre_model_region || this.form_cierre_model_region == -1 ){
                this.form_cierre_option_gerencia = null;
                this.form_cierre_model_gerencia = null;

                this.form_cierre_option_cedi = null;
                this.form_cierre_model_cedi = null;
            }else if(this.form_cierre_model_region !== -1){
                this.form_cierre_option_gerencia = null;
                this.form_cierre_model_gerencia = null;

                this.form_cierre_option_cedi = null;
                this.form_cierre_model_cedi = null;
                this.carteraService.getGerencia(this.form_cierre_model_region).subscribe({
                    next: (r) => {
                        this.form_cierre_option_gerencia = this.toolsService.getPutJsonTodos(r);
                    }
                });
            }
        }
        if(index === 1){
            if(!this.form_cierre_model_gerencia){
                this.form_cierre_option_cedi = null;
                this.form_cierre_model_cedi = null;
            }else{
                if(this.form_cierre_model_gerencia != -1){
                    this.form_cierre_option_cedi = null;
                    this.form_cierre_model_cedi = null;
                    this.carteraService.getCedi(this.form_cierre_model_gerencia).subscribe({
                        next: (r) => {
                            this.form_cierre_option_cedi = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                }
            }
        }
    }
    selectedComboCierreClean(index: number){
        if(index === 0){
            if(!this.form_cierre_model_region || this.form_cierre_model_region == -1 ){
                this.form_cierre_option_gerencia = null;
                this.form_cierre_model_gerencia = null;

                this.form_cierre_option_cedi = null;
                this.form_cierre_model_cedi = null;
            }else if(this.form_cierre_model_region !== -1){

                this.carteraService.getGerencia(this.form_cierre_model_region).subscribe({
                    next: (r) => {
                        this.form_cierre_option_gerencia = this.toolsService.getPutJsonTodos(r);
                    }
                });
            }
        }
        if(index === 1){
            if(!this.form_cierre_model_gerencia){
                this.form_cierre_option_cedi = null;
                this.form_cierre_model_cedi = null;
            }else{
                if(this.form_cierre_model_gerencia != -1){

                    this.carteraService.getCedi(this.form_cierre_model_gerencia).subscribe({
                        next: (r) => {
                            this.form_cierre_option_cedi = this.toolsService.getPutJsonTodos(r);
                        }
                    });
                }
            }
        }
    }

    guardarDatos(){
        this.flagSumbit = true;
        if(this.form_cierre_model_user && this.form_cierre_model_password && this.form_cierre_model_nombre
            && this.form_cierre_model_numero_empleado && this.form_cierre_model_region &&
            (this.form_cierre_model_sexo == 0 || this.form_cierre_model_sexo == 1 )
            && this.form_cierre_model_tipo ){
            if(this.flagAddUpdate){//actualizar
                this.usuariosService.getActualizarUsuario(
                    this.form_cierre_model_user,
                    this.form_cierre_model_password,
                    this.form_cierre_model_nombre,
                    this.form_cierre_model_numero_empleado,
                    this.form_cierre_model_sexo,
                    this.form_cierre_model_tipo,
                    this.form_cierre_model_region,
                    this.form_cierre_model_gerencia,
                    this.form_cierre_model_cedi,
                    this.usuario.user_id
                ).subscribe({
                    next: (r) => {
                        if(r && r['success']){
                            this.messageService.add({severity: 'success', summary: 'Completado!!', detail: 'Usuario Actualizado Correctamente!!', life: 3000});
                            this.refreshTable();
                            this.resetFields();
                        }else{
                            this.messageService.add({severity: 'error', summary: 'Error!!', detail: r['msg'], life: 3000});
                        }
                    },
                    error: (r) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error en el servidor!!', life: 3000});
                    }
                });
            }else{//agregar
                this.usuariosService.getAgregarUsuario(
                    this.form_cierre_model_user,
                    this.form_cierre_model_password,
                    this.form_cierre_model_nombre,
                    this.form_cierre_model_numero_empleado,
                    this.form_cierre_model_sexo,
                    this.form_cierre_model_tipo,
                    this.form_cierre_model_region,
                    this.form_cierre_model_gerencia,
                    this.form_cierre_model_cedi
                ).subscribe({
                    next: (r) => {
                        if(r && r['success']){
                            this.messageService.add({severity: 'success', summary: 'Completado!!', detail: 'Usuario Agregado Correctamente!!', life: 3000});
                            this.refreshTable();
                            this.resetFields();
                        }else{
                            this.messageService.add({severity: 'error', summary: 'Error!!', detail: r['msg'], life: 3000});
                        }
                    },
                    error: (r) => {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error en el servidor!!', life: 3000});
                    }
                });
            }
        }else{
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Faltan Campos por Llenar!!', life: 3000});
        }
    }

    resetFields(){
        this.form_cierre_model_user = null;
        this.form_cierre_model_password = null;
        this.form_cierre_model_nombre = null;
        this.form_cierre_model_numero_empleado = null;
        this.form_cierre_model_sexo = null;
        this.form_cierre_model_tipo = null;
        this.form_cierre_model_region = null;
        this.form_cierre_model_gerencia = null;
        this.form_cierre_model_cedi = null;
        this.flagSumbit = false;
        this.modalAgregarUpdate = false;
        this.flagAddUpdate = false;
    }

}
