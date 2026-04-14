import { Component, inject, OnInit } from '@angular/core';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { MessageService} from 'primeng/api';
import { ReportesService } from 'src/app/demo/service/admin/reportes/reportes.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
  providers: [MessageService]
})
export class ReportesComponent implements OnInit {

    messageService      = inject(MessageService);
    carteraService      = inject(CarteraService);
    toolsService        = inject(ToolsService);
    reportesService     = inject(ReportesService);


    form_filterG_model_fecha_de: string = '';
    // form_filterG_model_fecha_a: string = '';
    form_filterG_model_region: number = null; form_filterG_option_region: any[];
    form_filterG_model_gerencia: any[]; form_filterG_option_gerencia: any[];
    form_filterG_model_cedi: number = null; form_filterG_option_cedi: any[];
    form_filterG_model_negociador: number = null; form_filterG_option_negociador: any[];
    // form_filterG_model_rutas: number = null; form_filterG_option_rutas: any[];

    data_reporte_ruta: any[];
    data_reporte_por_hora: any[];
    data_reporte_fecha: any[];

    activeIndex: number = 0;

    ngOnInit(): void {
        this.selectores();
        this.form_filterG_model_fecha_de = this.toolsService.formatDateNow();
        // this.form_filterG_model_fecha_a = this.toolsService.formatDateNow();
    }
    onTabChange(event: any) {
        const index = event.index; // El índice de la pestaña (0, 1, 2...)
        console.log('Tab actual:', index);
        this.activeIndex = index;
    }
    refreshReporteRuta(date_fr?: string, date_to?: string){
        this.reportesService.getReportePorRuta(
          this.form_filterG_model_region ? this.form_filterG_model_region.toString() : '',
          this.form_filterG_model_gerencia && this.form_filterG_model_gerencia.length > 0 ? this.form_filterG_model_gerencia.toString() : '',
          this.form_filterG_model_cedi ? this.form_filterG_model_cedi.toString() : '',
          this.form_filterG_model_negociador ? this.form_filterG_model_negociador.toString() : '',
          date_fr, date_to
        ).subscribe({
            next: (r) => {
                if(r && r['success']){
                    this.data_reporte_ruta = r['rows'];
                }else{
                    this.data_reporte_ruta = [];
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                }
            },
            error: (r) => {
                this.data_reporte_ruta = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            },
            complete: () => {

                // if( this.form_filterG_model_cedi && this.form_filterG_model_cedi > 0 ){
                //     console.log('por hora');
                //     this.refreshReporteHora(date_fr, date_fr);   
                // }else{
                //     console.log('por fecha');
                //     this.refreshReporteFecha(date_fr, date_fr);
                // }
            }
        });
    }
    refreshReporteHora(date_fr?: string, date_to?: string){
        if( this.form_filterG_model_cedi && this.form_filterG_model_cedi > 0 ){
            this.reportesService.getReporteHora(
            this.form_filterG_model_region ? this.form_filterG_model_region.toString() : '',
          this.form_filterG_model_gerencia && this.form_filterG_model_gerencia.length > 0 ? this.form_filterG_model_gerencia.toString() : '',
            this.form_filterG_model_cedi ? this.form_filterG_model_cedi.toString() : '',
            this.form_filterG_model_negociador ? this.form_filterG_model_negociador.toString() : '',
            date_fr, date_to
            ).subscribe({
                next: (r) => {
                    if(r && r['success']){
                        this.data_reporte_por_hora = r['rows'];
                    }else{
                        this.data_reporte_por_hora = [];
                        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                    }
                },
                error: (r) => {
                    this.data_reporte_por_hora = [];
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                },
                complete: () => {
                    //this.refreshReporteFecha(date_fr, date_fr);
                }
            });

        }
    }
    refreshReporteFecha( date_fr?: string, date_to?: string){
        this.reportesService.getReportePorFecha(
            this.form_filterG_model_region ? this.form_filterG_model_region.toString() : '',
            this.form_filterG_model_gerencia && this.form_filterG_model_gerencia.length > 0 ? this.form_filterG_model_gerencia.toString() : '',
            this.form_filterG_model_cedi ? this.form_filterG_model_cedi.toString() : '',
            date_fr, date_to
          ).subscribe({
              next: (r) => {
                  if(r && r['success']){
                      this.data_reporte_fecha = r['rows'];
                  }else{
                      this.data_reporte_fecha = [];
                      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                  }
              },
              error: (r) => {
                  this.data_reporte_fecha = [];
                  this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
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
    }

    selectedCombo(index: number){
        if(index === 0){
            if(!this.form_filterG_model_region){
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;

                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
                this.form_filterG_option_negociador = null;
                this.form_filterG_model_negociador = null;
            }else{
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;
                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
                this.form_filterG_option_negociador = null;
                this.form_filterG_model_negociador = null;
                this.carteraService.getGerencia(this.form_filterG_model_region).subscribe({
                    next: (r) => {
                        this.form_filterG_option_gerencia = this.toolsService.getPutJsonTodos(r);
                        // this.form_filterG_option_gerencia = r;
                    }
                });
            }
        }
        if(index === 1){
            if(!this.form_filterG_model_gerencia && this.form_filterG_model_gerencia.length == 0){
                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
                this.form_filterG_option_negociador = null;
                this.form_filterG_model_negociador = null;
            }else{
                if(this.form_filterG_model_gerencia.length == 1 && this.form_filterG_model_gerencia[0] != -1 ){
                    this.form_filterG_option_cedi = null;
                    this.form_filterG_model_cedi = null;
                    this.form_filterG_option_negociador = null;
                    this.form_filterG_model_negociador = null;
                    this.carteraService.getCedi(this.form_filterG_model_gerencia[0]).subscribe({
                        next: (r) => {
                            this.form_filterG_option_cedi = this.toolsService.getPutJsonTodos(r);
                            // this.form_filterG_option_cedi = r;
                        }
                    });
                }else if(this.form_filterG_model_gerencia.length > 1){
                    this.form_filterG_option_cedi = null;
                    this.form_filterG_model_cedi = null;
                    this.form_filterG_option_negociador = null;
                    this.form_filterG_model_negociador = null;
                }
            }
        }
        if(index === 2){
            if(!this.form_filterG_model_cedi){
                this.form_filterG_option_negociador = null;
                this.form_filterG_model_negociador = null;
            }else{
                if(this.form_filterG_model_cedi != -1){
                this.form_filterG_option_negociador = null;
                this.form_filterG_model_negociador = null;
                    this.carteraService.getNegociadores({ cds: this.form_filterG_model_cedi }).subscribe({
                        next: (r) => {
                            this.form_filterG_option_negociador = this.toolsService.getPutJsonTodos(r['data']);
                        }
                    });
                }
            }
        }
    }

    runFilterGeneric(){
        let date_fr = this.form_filterG_model_fecha_de && this.form_filterG_model_fecha_de.length <= 10
        ? this.form_filterG_model_fecha_de
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_de, false, false);
        // let date_to = this.form_filterG_model_fecha_a && this.form_filterG_model_fecha_a.length <= 10
        // ? this.form_filterG_model_fecha_a
        // : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_a, false, false);
        // this.refreshReporteRuta(date_fr, date_fr);//1

        if (this.activeIndex === 0) {
            this.refreshReporteRuta(date_fr, date_fr);//1
        }
        if (this.activeIndex === 1) {
            if( this.form_filterG_model_cedi && this.form_filterG_model_cedi > 0 ){
                this.refreshReporteHora(date_fr, date_fr);   
            }else{
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Tienes que seleccionar un Cedi!!', life: 3000});
            }
        }
        if (this.activeIndex === 2) {
            this.refreshReporteFecha(date_fr, date_fr);
        }
    }

}
