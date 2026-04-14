import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConstantsUrls } from '../../api/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    httpClient = inject(HttpClient);

    getLoginCredentials(user: string, pass: string){
        return this.httpClient.get<any[]>(`${ConstantsUrls.baseUrl}c=Users&cmd=getCredentialsWeb&exec=self&user=${user}&pass=${pass}`);
    }
}
