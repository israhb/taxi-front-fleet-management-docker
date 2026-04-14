import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

    httpClient = inject(HttpClient);

    uid = localStorage.getItem('uid');

    getListadoValidacion(
        page: number,
        start: number,
        limit: number,
        u_reg?: number,
        ger?: number,
        cds?: number,
        rta_id?: string,
        sts_id?: string,
        date_fr?: string,
        date_to?: string
    ){
        // let filter = '';
        // filter += u_reg && u_reg != null ? `&u_reg=${u_reg}` : ``;
        // filter += ger && ger != null ? `&ger=${ger}` : ``;
        // filter += cds && cds != null ? `&cds=${cds}` : ``;
        // filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        // filter += sts_id != null ? `&sts_id=${sts_id}` : ``;
        // filter += date_fr != null ? `&date_fr=${date_fr}` : ``;
        // filter += date_to != null ? `&date_to=${date_to}` : ``;
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=validacion&cmd=getValidacionListadoDDM&exec=self&uid=${this.uid}&page=${page}&start=${start}&limit=${limit}${filter}`);
        u_reg = u_reg ? u_reg : 0;
        ger = ger ? ger : 0;
        cds = cds ? cds : 0;
        rta_id = rta_id ? rta_id : '';
        sts_id = sts_id ? sts_id : '';
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMValidacionListarP?reg=${u_reg}&ger=${ger}&cds=${cds}&ruta=${rta_id}&startNum=${start}&LimitNum=${limit}&status=${sts_id}&date_from=${date_fr}&date_to=${date_to}`);
    }

    getDescargarValidacion(
        u_reg: number,
        ger: number,
        cds: number,
        rta_id: string,
        sts_id: string,
        date_fr: string,
        date_to: string
    ){
        let filter = '';
        filter += u_reg && u_reg != null ? `&u_reg=${u_reg}` : ``;
        filter += ger && ger != null ? `&ger=${ger}` : ``;
        filter += cds && cds != null ? `&cds=${cds}` : ``;
        filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        filter += sts_id != null ? `&sts_id=${sts_id}` : ``;
        filter += date_fr && date_fr != '' ? `&date_fr=${date_fr}` : ``;
        filter += date_to && date_to != '' ? `&date_to=${date_to}` : ``;
        return this.httpClient.get(`${ConstantsUrls.baseUrl}c=validacion&cmd=getValidacionListadoDDM&exec=self&uid=${this.uid}&download=true${filter}`,  {responseType: `blob`});
    }

    getListadoEstatus(){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMEstatusListarP`);
    }

    setValidateRegister(id_register: number, validado: number, comentario: string){
        return this.httpClient.get(`${ConstantsUrls.baseUrl}c=Validacion&cmd=actualizarRevisadoRegistro&exec=self&validado=${validado}&id=${id_register}&comentario=${comentario}&uid=${this.uid}`);
    }
}
