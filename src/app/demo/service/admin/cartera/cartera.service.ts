import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

    httpClient = inject(HttpClient);

    uid = localStorage.getItem('uid');
    level = localStorage.getItem('level');

    getListadoCartera(
        page: number,
        start: number,
        limit: number,
        nuds?: string,
        u_reg?: number,
        ger?: number,
        cds?: number,
        rta_id?: string,
        carga?: number
    ){
        // let filter = '';
        // filter += nuds && nuds != '' ? `&ids=${nuds}` : ``;
        // filter += u_reg && u_reg != null ? `&u_reg=${u_reg}` : ``;
        // filter += ger && ger != null ? `&ger=${ger}` : ``;
        // filter += cds && cds != null ? `&cds=${cds}` : ``;
        // filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        // filter += carga != null ? `&carga=${carga}` : ``;
        u_reg = u_reg ? u_reg : 0;
        ger = ger ? ger : 0;
        cds = cds ? cds : 0;
        rta_id = rta_id ? rta_id : '';
        carga = carga ? carga : -1;
        nuds = nuds ? nuds : '';
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=cartera&cmd=getCarteraListado&exec=self&uid=${this.uid}&page=${page}&start=${start}&limit=${limit}${filter}`);
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMCarteraListarP?reg=${u_reg}&ger=${ger}&cds=${cds}&ruta=${rta_id}&startNum=${start}&LimitNum=${limit}&carga=${carga}&nuds=${nuds}`);
    }

    getListadoCarteraSemanal(
        page: number,
        start: number,
        limit: number,
        nuds?: string,
        u_reg?: number,
        ger?: number,
        cds?: number,
        rta_id?: string,
        carga?: number
    ){
        let filter = '';
        // filter += nuds && nuds != '' ? `&ids=${nuds}` : ``;
        // filter += u_reg && u_reg != null ? `&u_reg=${u_reg}` : ``;
        // filter += ger && ger != null ? `&ger=${ger}` : ``;
        // filter += cds && cds != null ? `&cds=${cds}` : ``;
        // filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        // filter += carga != null ? `&carga=${carga}` : ``;
        u_reg = u_reg ? u_reg : 0;
        ger = ger ? ger : 0;
        cds = cds ? cds : 0;
        rta_id = rta_id ? rta_id : '';
        carga = carga ? carga : -1;
        nuds = nuds ? nuds : '';

        //return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=cartera&cmd=getCarteraSemanalListado&exec=self&uid=${this.uid}&page=${page}&start=${start}&limit=${limit}${filter}`);
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMCarteraSemanalListarP?reg=${u_reg}&ger=${ger}&cds=${cds}&ruta=${rta_id}&startNum=${start}&LimitNum=${limit}&carga=${carga}&nuds=${nuds}`);
    }

    postListadoReferencias(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseUrl}appPolitikaListadoReferenciasWeb`, json, {});
    }

    postCargarDiaria(file: File, flag: string){
        const formData = new FormData();
        formData.append('frm_ini_xls', file);
        formData.append('frm_ini_act', flag);
        formData.append('bandeInsertBack', '0');
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Cartera&cmd=processForm&exec=self&uid=${this.uid}`, formData);
    }

    postCargarSemanalNuevaTabla(file: File, flag: string, region: number, gerencia: number, cedi: number){
        const formData = new FormData();
        formData.append('frm_ini_xls', file);
        formData.append('frm_ini_act', flag);
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Cartera&cmd=processForm&exec=self&uid=${this.uid}&region=${region}&gerencia=${gerencia}&cedi=${cedi}`, formData);
    }
    postCargarSemanalBase64(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}geppDDMSubirCsvP`, json);
    }
    private apiKey = '75baa935-2997-4d2e-9fac-9998f5f242b8'; // Reemplaza con tu API key de DeepAI
    private apiUrl = 'https://api.deepai.org/api/image-editor';
    // private apiUrl = 'https://api.deepai.org/api/image-manipulation';
    // private apiUrl = 'https://api.deepai.org/api/colorizer';
    // private apiUrl = 'https://api.deepai.org/api/image-text2img';
    // private apiUrl = 'https://api.deepai.org/api/image-generator/change-eye-color';
  
     // Método para cambiar el color de ojos en una imagen
    changeEyeColor(image: File, text: string){
        const formData = new FormData();
        formData.append('image', image);
        formData.append('text', text);
        // formData.append('text', 'Change eye color to '+color);

        // formData.append('image_generator_version', 'hd');
        // formData.append('use_old_model', 'false');
        // formData.append('turbo', 'true');
        // formData.append('genius_preference', 'classic');
        // Encabezados con la API key
        const headers = new HttpHeaders({
            'api-key': this.apiKey
        });
        // Realiza la solicitud POST
        return this.httpClient.post(this.apiUrl,formData, { headers: headers });
    }

    getCierreDia(reg: number, ger: number, cds: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=Validacion&cmd=cerrarDiaSemanal&exec=self&reg=${reg}&ger=${ger}&cds=${cds}&bandera=1`);
    }

    getEliminarSemanal(reg: number, ger: number, cds: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=Validacion&cmd=cerrarDiaSemanal&exec=self&reg=${reg}&ger=${ger}&cds=${cds}&bandera=2`);
    }

    getEliminarSemanalNueva(reg: number, ger: number, cds: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=Validacion&cmd=cerrarDiaSemanalNuevaTabla&exec=self&reg=${reg}&ger=${ger}&cds=${cds}&bandera=2`);
    }

    getDescargarCartera(
        u_reg: number,
        ger: number,
        cds: number,
        rta_id: string,
        carga: number
    ){
        let filter = '';
        filter += u_reg && u_reg != null ? `&u_reg=${u_reg}` : ``;
        filter += ger && ger != null ? `&ger=${ger}` : ``;
        filter += cds && cds != null ? `&cds=${cds}` : ``;
        filter += rta_id && rta_id != '' ? `&rta_id=${rta_id}` : ``;
        filter += carga != null ? `&carga=${carga}` : ``;
        return this.httpClient.get(`${ConstantsUrls.baseUrl}c=cartera&cmd=getCarteraListado&exec=self&uid=${this.uid}&download=true${filter}`,  {responseType: `blob`});
    }

    postCambiosMasivos(file: File){
        const formData = new FormData();
        formData.append('wnd_upld_xls', file);
        formData.append('wnd_upld_act', '2');
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Validacion&cmd=processFormCartera&exec=self&uid=${this.uid}`, formData);
    }

    /********** Filtros ********* */
    getRegiones(){
        return this.httpClient.get<any[]>(`https://c3.tmsglobal.com.mx/site/desarrolloMercado/dispatcher.php?c=geppValida&cmd=getRegionesJson&exec=self&uid=42&u_reg=0&_dc=1768582575487&page=1&start=0&limit=25`);
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMRegionListarP`);
    }
    getGerencia(id_region: number){
        return this.httpClient.get<any[]>(`
https://c3.tmsglobal.com.mx/site/desarrolloMercado/dispatcher.php?c=geppValida&cmd=getGerenciasJson&exec=self&uid=42&u_ger=0&_dc=1768582720716&reg=${id_region}&page=1&start=0&limit=25`);
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMGerenciaListarP?reg=${id_region}`);
    }
    getCedi(id_region: number){
        return this.httpClient.get<any[]>(`https://c3.tmsglobal.com.mx/site/desarrolloMercado/dispatcher.php?c=geppValida&cmd=getCedisJson&exec=self&uid=42&u_cds=0&_dc=1768582800956&ger=${id_region}&page=1&start=0&limit=25`);
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMCediListarP?ger=${id_region}`);
    }
    getNegociadores(json: any){
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}geppDDMListadoUsuariosApp`, json);
    }
    getRutas(id_cedi: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMRutaListarP?cds=${id_cedi}`);
    }
    getRutasValidacion(id_cedi: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMRutaListarValidacionP?cds=${id_cedi}`);
    }
    getRutasSemanal(id_cedi: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=geppValida&cmd=getRtPrevEntSemanalJson&exec=self&cds=${id_cedi}`);
    }
    getRutasGrupos(id_cedi: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMRutaListarGruposP?cds=${id_cedi}`);
    }
    getGrupos(id_cedi: number){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMGrupoListarGruposP?cds=${id_cedi}`);
    }
    getUsuarios(id_region: number, id_gerencia: number, id_cedi: number, date: string){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=Map&cmd=getUserPromoData&exec=self&uid=${this.uid}&reg=${id_region}&ger=${id_gerencia}&cds=${id_cedi}&date=${date}`);
    }
    geNiveles(){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=users&cmd=getUserAllowLevels&exec=self&uid=${this.uid}&lvl=${this.level}`);
    }
}
