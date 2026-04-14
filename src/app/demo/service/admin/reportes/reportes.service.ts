import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

    httpClient = inject(HttpClient);

    uid = localStorage.getItem('uid');

    getReportePorRuta(
        u_reg:      string,
        ger:        string,
        cds:        string,
        user_id:     string,
        date_fr:    string,
        date_to:    string
    ){
        let rep_type = '';
        if( u_reg != '' && ger == '' ){
            rep_type = 'reg';
        }else if( u_reg != '' && ger != '' && cds == '' ){
            rep_type = 'ger';
        }else if( u_reg != '' && ger != '' && cds != '' && user_id == '' ){
            rep_type = 'cedi';
        }else if( u_reg != '' && ger != '' && cds != '' && user_id != '' ){
            rep_type = 'negociador';
        }
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=validacion&cmd=GetReport_By_Ruta&exec=self&u_reg=${u_reg}&ger=${ger}&cds=${cds}&user_id=${user_id}&date_fr=${date_fr}&date_to=${date_to}&rep_type=${rep_type}&uid=${this.uid}`);
    }
    getReporteHora(
        u_reg:      string,
        ger:        string,
        cds:        string,
        user_id:     string,
        date_fr:    string,
        date_to:    string
    ){
        let rep_type = '';
        if( u_reg != '' && ger == '' ){
            rep_type = 'reg';
        }else if( u_reg != '' && ger != '' && cds == '' ){
            rep_type = 'ger';
        }else if( u_reg != '' && ger != '' && cds != '' && user_id == '' ){
            rep_type = 'cedi';
        }else if( u_reg != '' && ger != '' && cds != '' && user_id != '' ){
            rep_type = 'negociador';
        }
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=validacion&cmd=GetReportByHour&exec=self&u_reg=${u_reg}&ger=${ger}&cds=${cds}&user_id=${user_id}&date_fr=${date_fr}&date_to=${date_to}&rep_type=${rep_type}&uid=${this.uid}`);
    }
    

    getReportePorFecha(
        u_reg:      string,
        ger:        string,
        cds:        string,
        date_fr:    string,
        date_to:    string
    ){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=validacion&cmd=GetReport_By_Semana&exec=self&u_reg=${u_reg}&ger=${ger}&cds=${cds}&date_fr=${date_fr}&date_to=${date_to}&rep_type=cedi&uid=${this.uid}`);
    }
    getUsuariosProductividad(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}reportes/geppDDMReporteHoraSelectorUsuarios`, json);
    }
    getReportePorHora(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}reportes/geppDDMReporteHora`, json);
    }
    getReportePorHoraTotal(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}reportes/geppDDMReporteHoraRegistrosTotales`, json);
    }
}
