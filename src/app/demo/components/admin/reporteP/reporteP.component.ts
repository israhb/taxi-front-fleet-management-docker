import { Component, inject, OnInit } from '@angular/core';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { MessageService} from 'primeng/api';
import { ReportesService } from 'src/app/demo/service/admin/reportes/reportes.service';


@Component({
  selector: 'app-reporteP',
  templateUrl: './reporteP.component.html',
  styleUrl: './reporteP.component.scss',
  providers: [MessageService]
})
export class ReportePComponent implements OnInit {

    messageService      = inject(MessageService);
    carteraService      = inject(CarteraService);
    toolsService        = inject(ToolsService);
    reportesService     = inject(ReportesService);


    form_filterG_model_fecha_de: string = '';
    form_filterG_model_usuario: number; form_filterG_options_usuario: any[]; 

    data_reporte_ruta: any[];
    data_reporte_fecha: any[];

    ngOnInit(): void {
        this.form_filterG_model_fecha_de = this.toolsService.formatDateNow();
        this.getUsersSelectores();
    }
    getUsersSelectores(){
        let fecha = this.form_filterG_model_fecha_de && this.form_filterG_model_fecha_de.length <= 10
        ? this.form_filterG_model_fecha_de
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_de, false, false);
        let json = {
            "fecha": fecha
        };
        this.reportesService.getUsuariosProductividad(json).subscribe({
            next: (r) => {
                if( r['totalrows'] > 0){
                    this.form_filterG_options_usuario = this.toolsService.getPutJsonTodos(r['data']);
                }else{
                    this.form_filterG_options_usuario = [];
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                }
            },
            error: (r) => {
                this.form_filterG_options_usuario = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            }
        });
    }
    refreshTables(){
        let fecha = this.form_filterG_model_fecha_de && this.form_filterG_model_fecha_de.length <= 10
        ? this.form_filterG_model_fecha_de
        : this.toolsService.formatDateInputs(this.form_filterG_model_fecha_de, false, false);
        let json = {
            "fecha": fecha,
            "user_id": this.form_filterG_model_usuario
        };
        this.reportesService.getReportePorHora(json).subscribe({
            next: (r) => {
                if( r['totalrows'] > 0){
                    this.data_reporte_ruta = r['data'];
                }else{
                    this.data_reporte_ruta = [];
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
                }
            },
            error: (r) => {
                this.data_reporte_ruta = [];
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Sin Información!!', life: 3000});
            }
        });
        this.reportesService.getReportePorHoraTotal(json).subscribe({
            next: (r) => {
                if( r['totalrows'] > 0){
                    this.data_reporte_fecha = r['data'];
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

}
