import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem, Message  } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Cartera } from 'src/app/demo/api/models/admin/cartera/Cartera';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';

@Component({
  selector: 'app-cartera-s',
  templateUrl: './cartera-s.component.html',
  styleUrl: './cartera-s.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class CarteraSComponent implements OnInit{


  items: MenuItem[];
  /********* TABLA ********************** */
  cartera: Cartera;
  carteras: Cartera[];
  //Referencias
  referencias: any[];
  //Dialogs
  modalFiltrosG: boolean;
  modalCargarDiaria: boolean;
  modalCierreDia: boolean;
  modalCambiosMasivos: boolean;
  modalTakePassword: boolean;
  modalEliminarSemanal: boolean;
  dialogFotoGPS: boolean;
  //options map
  center: any;
  zoom: number;
  marker : any;
  //
  form_filter_model_nuds: string;
  //
  form_filterG_model_region: number; form_filterG_option_region: any[];
  form_filterG_model_gerencia: number; form_filterG_option_gerencia: any[];
  form_filterG_model_cedi: number; form_filterG_option_cedi: any[];
  form_filterG_model_rutas: number; form_filterG_option_rutas: any[];
  form_filterG_model_carga: number; form_filterG_option_carga = [
      { i: -1, d: 'Todos' },
      { i: 0, d: 'Diaria' },
      { i: 1, d: 'Semanal' }
  ];
  //cierre dia
  form_cierre_model_region: number; form_cierre_option_region: any[];
  form_cierre_model_gerencia: number; form_cierre_option_gerencia: any[];
  form_cierre_model_cedi: number; form_cierre_option_cedi: any[];
  flagSumbit: boolean;
  messagesCierre: Message[];
  //pedir contraseña
  form_data_succes_masive: string;
  messagesMassiveFile: Message[];
  //cierre dia
  form_eliminar_semanal_model_region: number; form_eliminar_semanal_option_region: any[];
  form_eliminar_semanal_model_gerencia: number; form_eliminar_semanal_option_gerencia: any[];
  form_eliminar_semanal_model_cedi: number; form_eliminar_semanal_option_cedi: any[];
  flagSumbitEliminar: boolean;
  messagesEliminarSemanal: Message[];

  totalRecords: number;
  page: number = 0;
  first: number = 0;
  rows: number = 15;

  messages: Message[];
  flag_semanal_diaria: boolean;
  flag_semanal_diaria_title: string;
  file: File;

  //flags
  flag_password: number;//1-> cambio masivo, 2-> eliminar semanal

  private CHUNK_SIZE = 5000; 
  blockedDocument: boolean = false;
  modalProgress: boolean = false;
  msg_accion_modal: string = '';



  selectedFile: File | null = null;
  selectedFileBase64: string;
  resultImageUrl: string | null = null;
  errorMessage: string | null = null;
  inputString: string = '';


  constructor(
      private messageService: MessageService,
      private carteraService:CarteraService,
      private toolsService:ToolsService
  ) { }

  ngOnInit(): void {
      this.selectores();
      this.items = [
          // {
          //     label: 'Filtrar por Nuds',
          //     icon: 'pi pi-fw pi-filter',
          //     command: () => {
          //         this.openFilterNud();
          //     },
          // },
          // {
          //     separator: true
          // },
          // {
          //     label: 'Cargar Cartera Diaria',
          //     icon: 'pi pi-fw pi-plus',
          //     command: () => {
          //         this.openCarteraDiariaSemanal(true);
          //     },
          // },
          // {
          //     separator: true
          // },
          {
              label: 'Cargar Cartera Semanal',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.openCierreDia();
                  // this.openCarteraDiariaSemanal(false);
              },
          },
          // {
          //     separator: true
          // },
          // {
          //     label: 'Cierre de Dia',
          //     icon: 'pi pi-fw pi-plus',
          //     command: () => {
          //         this.openCierreDia();
          //     },
          // },
          // {
          //     separator: true
          // },
          // {
          //     label: 'Cambios Masivos',
          //     icon: 'pi pi-fw pi-plus',
          //     command: () => {
          //         this.openGetPassword(1);
          //     },
          // },
          // {
          //     separator: true
          // },
          {
              label: 'Eliminar Semanal',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                  this.openGetPassword(2);
              },
          }
      ];
      this.runFilterGeneric();
  }


  // Método para manejar la selección de archivos
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    // this.convertFileToBase64(this.selectedFile).then((base64String) => {
    //     this.selectedFileBase64 = base64String;
    //     console.log(base64String); // Aquí tienes la cadena Base64
    //   }).catch(error => console.error('Error al convertir archivo:', error));
  }

    // Método para enviar la imagen al servicio
    changeEyeColor(color: string): void {
        if (!this.selectedFile) {
          this.errorMessage = 'Por favor, selecciona una imagen.';
          return;
        }
        let json = {
            'image': this.selectedFileBase64, // Enviar la imagen en base64
            'text': 'Change eye color to blue' // Aquí puedes especificar el cambio deseado
        };
        this.carteraService.changeEyeColor(this.selectedFile, this.inputString).subscribe({
          next: (response: any) => {
            this.resultImageUrl = response.output_url; // URL de la imagen modificada
            this.errorMessage = null;
          },
          error: (error) => {
            this.errorMessage = 'Error al procesar la imagen: ' + error.message;
            this.resultImageUrl = null;
          },
        });
    }
    convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
    }

  onPageChange(data: any){
      this.page = data['page'];
      this.first = data['first'];
      this.rows = data['rows'];
      this.runFilterGeneric();
  }

  refreshTable(rutas?: string){
      this.carteraService.getListadoCarteraSemanal(
          this.page, this.first, this.rows,
          this.form_filter_model_nuds,
          this.form_filterG_model_region, this.form_filterG_model_gerencia,
          this.form_filterG_model_cedi, rutas, this.form_filterG_model_carga
          ).subscribe({
          next: (r) => {
              this.form_filter_model_nuds = '';
              if(r && r['success']){
                  this.carteras = this.toolsService.getGenerateNumeracionTables(r['rows']);
                  this.totalRecords = r['results'];
              }else{
                  this.carteras = [];
                  this.totalRecords = 0;
              }
          },
          error: (r) => {
              this.carteras = [];
              this.totalRecords = 0;
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
          }
      });
  }
  downloadCartera(){
      let rutas = this.form_filterG_model_rutas ? this.form_filterG_model_rutas.toString() : '';
      this.carteraService.getDescargarCartera(
          this.form_filterG_model_region, this.form_filterG_model_gerencia,
          this.form_filterG_model_cedi, rutas, this.form_filterG_model_carga
          ).subscribe({
          next: (r) => {
              var file = new Blob([r], {
                  type: 'text/csv;charset=utf-8'
              });
              this.toolsService.saveAsExcelFile(file, "Listado Cartera");
          },
          error: (r) => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Hubo un Error en el Servidor!!', life: 3000});
          }
      });

  }
  selectores(){
      if(!this.form_filterG_option_region || !this.form_cierre_option_region
          || !this.form_eliminar_semanal_option_region){
          this.carteraService.getRegiones().subscribe({
              next: (r) => {
                  this.form_filterG_option_region = r;
                  this.form_cierre_option_region = r;
                  this.form_eliminar_semanal_option_region = r;
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
                  this.carteraService.getRutasSemanal(this.form_filterG_model_cedi).subscribe({
                      next: (r) => {
                          this.form_filterG_option_rutas = this.toolsService.getPutJsonTodos(r);
                      }
                  });
              }
          }
      }
  }
  selectedComboCierre(index: number){
      if(index === 0){
          if(!this.form_cierre_model_region){
              this.form_cierre_option_gerencia = null;
              this.form_cierre_model_gerencia = null;

              this.form_cierre_option_cedi = null;
              this.form_cierre_model_cedi = null;
          }else{
              this.form_cierre_option_gerencia = null;
              this.form_cierre_model_gerencia = null;

              this.form_cierre_option_cedi = null;
              this.form_cierre_model_cedi = null;
              this.carteraService.getGerencia(this.form_cierre_model_region).subscribe({
                  next: (r) => {
                      this.form_cierre_option_gerencia = r;
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
                          this.form_cierre_option_cedi = r;
                      }
                  });
              }
          }
      }
  }
  selectedComboEliminarS(index: number){
      if(index === 0){
          if(!this.form_eliminar_semanal_model_region){
              this.form_eliminar_semanal_option_gerencia = null;
              this.form_eliminar_semanal_model_gerencia = null;

              this.form_eliminar_semanal_option_cedi = null;
              this.form_eliminar_semanal_model_cedi = null;
          }else{
              this.form_eliminar_semanal_option_gerencia = null;
              this.form_eliminar_semanal_model_gerencia = null;

              this.form_eliminar_semanal_option_cedi = null;
              this.form_eliminar_semanal_model_cedi = null;
              this.carteraService.getGerencia(this.form_eliminar_semanal_model_region).subscribe({
                  next: (r) => {
                      this.form_eliminar_semanal_option_gerencia = r;
                  }
              });
          }
      }
      if(index === 1){
          if(!this.form_eliminar_semanal_model_gerencia){
              this.form_eliminar_semanal_option_cedi = null;
              this.form_eliminar_semanal_model_cedi = null;
          }else{
              if(this.form_eliminar_semanal_model_gerencia != -1){
                  this.form_eliminar_semanal_option_cedi = null;
                  this.form_eliminar_semanal_model_cedi = null;
                  this.carteraService.getCedi(this.form_eliminar_semanal_model_gerencia).subscribe({
                      next: (r) => {
                          this.form_eliminar_semanal_option_cedi = r;
                      }
                  });
              }
          }
      }
  }
  openFilterGeneric(){
      this.selectores();
      this.modalFiltrosG = true;
  }
  runFilterGeneric(){
      let rutas = this.form_filterG_model_rutas ? this.form_filterG_model_rutas.toString() : '';
      this.modalFiltrosG = false;
      this.refreshTable(rutas);
  }
  openCarteraDiariaSemanal(flag: boolean){
      this.flag_semanal_diaria = flag;
      this.flag_semanal_diaria_title = flag ? 'Cargar Cartera Diaria' : 'Cargar Cartera Semanal';
      this.messages = [];
      this.modalCargarDiaria = true;
  }
  openCierreDia(){
      this.messagesCierre = [];
      this.form_cierre_model_region = null;
      this.form_cierre_model_gerencia = null;
      this.form_cierre_model_cedi = null;
      this.modalCierreDia = true;
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
          if(this.flag_semanal_diaria){//cartera diaria
              this.carteraService.postCargarDiaria(this.file, '0').subscribe({
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
              this.carteraService.postCargarDiaria(this.file, '1').subscribe({
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
          }
      }else{
          this.messages = [{ severity: 'warn', summary: 'Error', detail: 'Adjunta un Archivo!!!' }];
      }
  }

  async getSubirSemanalFiltros(){
      this.flagSumbit = true;
      if(this.form_cierre_model_region && this.form_cierre_model_gerencia
          && this.form_cierre_model_cedi && this.file
      ){

        const fileContent = await this.readFile(this.file);
        const lines = fileContent.split(/\r?\n/);
        
        
        const headers = lines.shift();
        
        let chunkIndex = 0;
        this.blockedDocument = true;
        //this.messageService.add({severity: 'info', summary: 'Info', detail: 'Cargando tu CSV espere.....', life: 3000});
        this.modalCierreDia = false;
        this.modalProgress = true;
        this.msg_accion_modal = 'Subiendo informacion .......';

        while (lines.length > 0) {
            const chunk = lines.splice(0, this.CHUNK_SIZE);
            const csvChunk = [headers, ...chunk].join('\n');
            console.log({
                csv: csvChunk,
                index: chunkIndex
            });
            // Convertir a Base64
            const base64Chunk = await this.convertToBase64(csvChunk);
            console.log({
                archivo: base64Chunk
            });
            
            let json = {
                csvBase64: base64Chunk,
                keyName: 'file_csv_'+chunkIndex+'_'+this.getRandomString(5)+'.csv'
            };
            this.carteraService.postCargarSemanalBase64(json).subscribe({
                next: (r) => {
                    console.log(r);
                    // if(r['success']){
                    //     this.messagesCierre = [{ severity: 'success', summary: 'Exito!', detail: 'Archivo agregado' }];
                    //     this.runFilterGeneric();
                    // }else{
                    //     this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: 'Error' }];
                    // }
                },
                error: (e) => {
                    console.log({error_data: e});
                    this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: 'Error' }];
                }
            });
            await this.delay(3000);
            chunkIndex++;
        }

        this.modalProgress = true;
        this.msg_accion_modal = 'Csv Cargado!!';
        this.blockedDocument = false;
        //this.messageService.add({severity: 'info', summary: 'Info', detail: 'Csv Cargado!!!', life: 3000});
        // this.carteraService.postCargarSemanalNuevaTabla(this.file, '3', this.form_cierre_model_region, this.form_cierre_model_gerencia, this.form_cierre_model_cedi).subscribe({
        //   next: (r) => {
        //       if(r['success']){
        //           this.messagesCierre = [{ severity: 'success', summary: 'Exito!', detail: r['msg'] }];
        //           this.runFilterGeneric();
        //       }else{
        //           this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: r['msg'] }];
        //       }
        //   },
        //   error: (e) => {
        //       console.log({error_data: e});
        //       this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: e['error']['msg'] }];
        //   }
        // });


          // this.carteraService.getCierreDia(this.form_cierre_model_region,
          //     this.form_cierre_model_gerencia, this.form_cierre_model_cedi
          //     ).subscribe({
          //     next: (r) => {
          //         if(r['success']){
          //             this.messagesCierre = [{ severity: 'success', summary: 'Exito!', detail: r['data'] }];
          //             this.form_cierre_model_region = null;
          //             this.form_cierre_model_gerencia = null;
          //             this.form_cierre_model_cedi = null;
          //             this.flagSumbit = false;
          //             this.runFilterGeneric();
          //         }else{
          //             this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: r['data'] }];
          //         }
          //     },
          //     error: (e) => {
          //         console.log({error_data: e});
          //         this.messagesCierre = [{ severity: 'warn', summary: 'Error', detail: e['error']['data'] }];
          //     }
          // });

      }else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Faltan campos por llenar!', life: 3000});
      }
  }
    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getRandomString(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    private readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
    private convertToBase64(data: string): Promise<string> {
        return new Promise((resolve) => {
          const base64 = btoa(unescape(encodeURIComponent(data))); // Convertir a Base64
          resolve(base64);
        });
    }
  
  openGetPassword(flag: number){
      this.flag_password = flag;
      this.messagesMassiveFile = [];
      this.modalTakePassword = true;
  }
  clouseModal(data: any){
      this.modalTakePassword = data;
  }
  getSuccesModal(data: any){
      if(this.flag_password === 1){
          this.modalCambiosMasivos = data;
      }else if(this.flag_password === 2){
          this.openEliminarSemanal(data);
      }

  }
  clouseModalMassiveUploadFile(data: any){
      this.modalCambiosMasivos = data;
  }
  getSuccesMassiveModalUpload(){
      if(this.file){
          this.carteraService.postCambiosMasivos(this.file).subscribe({
              next: (r) => {
                  if(r['success']){
                      this.form_data_succes_masive = r['reg'];
                      this.messagesMassiveFile = [{ severity: 'success', summary: 'Exito!', detail: r['msg'] }];
                      this.runFilterGeneric();
                  }else{
                      this.messagesMassiveFile = [{ severity: 'warn', summary: 'Error', detail: r['msg'] }];
                  }
              },
              error: (e) => {
                  console.log({error_data: e});
                  this.messagesMassiveFile = [{ severity: 'warn', summary: 'Error', detail: e['error']['msg'] }];
              }
          });
      }else{
          this.messagesMassiveFile = [{ severity: 'warn', summary: 'Error', detail: 'Selecciona un Archivo!!' }];
      }
  }
  getFileMassiveData(file: File){
      this.file = file;
  }

  openEliminarSemanal(flag: boolean){
      this.messagesEliminarSemanal = [];
      this.form_eliminar_semanal_model_region = null;
      this.form_eliminar_semanal_model_gerencia = null;
      this.form_eliminar_semanal_model_gerencia = null;
      this.modalEliminarSemanal = flag;
  }
  runEliminarSemanal(){
      this.flagSumbitEliminar = true;
      if(this.form_eliminar_semanal_model_region && this.form_eliminar_semanal_model_gerencia
          && this.form_eliminar_semanal_model_cedi
      ){
          this.carteraService.getEliminarSemanalNueva(this.form_eliminar_semanal_model_region,
              this.form_eliminar_semanal_model_gerencia, this.form_eliminar_semanal_model_cedi
              ).subscribe({
              next: (r) => {
                  if(r['success']){
                      this.messagesEliminarSemanal = [{ severity: 'success', summary: 'Exito!', detail: r['data'] }];
                      this.form_eliminar_semanal_model_region = null;
                      this.form_eliminar_semanal_model_gerencia = null;
                      this.form_eliminar_semanal_model_cedi = null;
                      this.flagSumbitEliminar = false;
                      this.runFilterGeneric();
                  }else{
                      this.messagesEliminarSemanal = [{ severity: 'warn', summary: 'Error', detail: r['data'] }];
                  }
              },
              error: (e) => {
                  console.log({error_data: e});
                  this.messagesEliminarSemanal = [{ severity: 'warn', summary: 'Error', detail: e['error']['data'] }];
              }
          });

      }else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Faltan campos por llenar!', life: 3000});
      }
  }

  onFileSelect(file: File) {
    this.file = file;
    this.messagesCierre = [];
  }
}
