import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from 'src/app/demo/api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

    httpClient = inject(HttpClient);
    uid = localStorage.getItem('uid');

    postListadotracks(region: number, gerencia: number, cedi: number, user: number, fecha: string){
        return this.httpClient.get(`${ConstantsUrls.baseUrl}c=map&cmd=getPoints&oper=0&reg_id=${region}&ger_id=${gerencia}&cds_id=${cedi}&date_fr=${fecha}&date_to=${fecha}&user=${user}&uid=${this.uid}&exec=self`);
    }

    postListadoMarkers(user: number, fecha: string){
      return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=map&cmd=getPointsMarkerUser&date_fr=${fecha}&date_to=${fecha}&user=${user}&exec=self`);
  }
}
