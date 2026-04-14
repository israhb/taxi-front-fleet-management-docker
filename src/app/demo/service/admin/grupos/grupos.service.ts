import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

    httpClient = inject(HttpClient);

    uid = localStorage.getItem('uid');

    getListadoGrupos(
        page: number,
        start: number,
        limit: number,
        cds?: number,
        rta_id?: string,
        grupo?: number
    ){
        // let filter = '';
        // filter += cds && cds != null ? `&cds=${cds}` : ``;
        // filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        // filter += grupo != null ? `&grupo=${grupo}` : ``;

        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=cartera&cmd=getGruposListado&exec=self&uid=${this.uid}&page=${page}&start=${start}&limit=${limit}${filter}`);
        cds = cds ? cds : 0;
        rta_id = rta_id ? rta_id : '';
        grupo = grupo ? grupo : 0;
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMGrupoListarP?cds=${cds}&ruta=${rta_id}&startNum=${start}&LimitNum=${limit}&grupo=${grupo}`);
    }

    postCargarGrupos(file: File){
        const formData = new FormData();
        formData.append('frm_ini_xls', file);
        formData.append('frm_ini_act', '2');
        formData.append('bandeInsertBack', '0');
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Cartera&cmd=processForm&exec=self&uid=${this.uid}`, formData);
    }
}
