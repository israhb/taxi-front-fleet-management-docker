import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    httpClient = inject(HttpClient);

    uid = localStorage.getItem('uid');

    getListadoUsuarios(
        page: number,
        start: number,
        limit: number,
        textP?: string
    ){
        textP = textP ? textP : '';
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseAwsUrl}geppDDMUsuariosListarP?uid=42&page=0&startNum=${start}&LimitNum=${limit}&textP=${textP}`);
        // let filter = '';
        // filter += textP && textP != '' ? `&textP=${textP}` : ``;
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=users&cmd=GetUsersGridData&exec=self&uid=${this.uid}&page=${page}&start=${start}&limit=${limit}${filter}`);
    }

    getEliminarUsuario( user_id_delete: number){
        //return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=users&cmd=delete&exec=self&uid=${this.uid}&user_id=${user_id_delete}`);
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}geppDDMUsuarioEliminarP`,{ user_id:  user_id_delete});
    }

    postCargarUsuariosMasivos(file: File){
        const formData = new FormData();
        formData.append('wnd_upld_xls', file);
        formData.append('wnd_upld_act', '0');
        formData.append('wnd_upld_uid', '0');
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Validacion&cmd=massiveAddUsers&uid=${this.uid}`, formData);
    }

    postCambiosMasivosUsuarios(file: File){
        const formData = new FormData();
        formData.append('wnd_upld_xls', file);
        formData.append('wnd_upld_act', '0');
        formData.append('wnd_upld_uid', '0');
        return this.httpClient.post(`${ConstantsUrls.baseUrl}c=Validacion&cmd=massiveUpdateUsers&exec=self&uid=${this.uid}`, formData);
    }

    getAgregarUsuario(
        new_user_username: string,
        new_user_password: string,
        new_user_nombre: string,
        new_user_numero_empleado: string,
        new_user_sexo: number,
        new_user_level: string,
        new_user_region: number,
        new_user_gerencia: number,
        new_user_cedis: number
    ){
        let json = {
            new_user_username: new_user_username,
            new_user_password: new_user_password,
            new_user_nombre: new_user_nombre,
            new_user_numero_empleado: new_user_numero_empleado,
            new_user_level: new_user_level,
            new_user_sexo: new_user_sexo,
            uid: this.uid,
            new_user_region: new_user_region,
            new_user_gerencia: new_user_gerencia,
            new_user_cedis: new_user_cedis
        };
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}geppDDMUsuarioAgregarP`, json);
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=users&cmd=add&exec=self&uid=${this.uid}&new_user_username=${new_user_username}&new_user_password=${new_user_password}&new_user_nombre=${new_user_nombre}&new_user_numero_empleado=${new_user_numero_empleado}&new_user_sexo=${new_user_sexo}&new_user_level=${new_user_level}&new_user_region=${new_user_region}&new_user_gerencia=${new_user_gerencia}&new_user_cedis=${new_user_cedis}`);
    }

    getActualizarUsuario(
        new_user_username: string,
        new_user_password: string,
        new_user_nombre: string,
        new_user_numero_empleado: string,
        new_user_sexo: number,
        new_user_level: string,
        new_user_region: number,
        new_user_gerencia: number,
        new_user_cedis: number,
        new_user_id: number
    ){
        // return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=users&cmd=update&exec=self&uid=${this.uid}&new_user_password=${new_user_password}&new_user_numero_empleado=${new_user_numero_empleado}&new_user_level=${new_user_level}&new_user_id=${new_user_id}&new_user_region=${new_user_region}&new_user_gerencia=${new_user_gerencia}&new_user_cedis=${new_user_cedis}`);
        let json = {
            new_user_id: new_user_id,
            new_user_password: new_user_password,
            new_user_level: new_user_level,
            new_user_numero_empleado: new_user_numero_empleado,
            new_user_region: new_user_region,
            new_user_gerencia: new_user_gerencia,
            new_user_cedis: new_user_cedis
        };
        return this.httpClient.post(`${ConstantsUrls.baseAwsUrl}geppDDMUsuarioActualizarP`, json);
    }

}
