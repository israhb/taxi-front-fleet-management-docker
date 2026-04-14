import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { MessageService} from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    // valCheck: string[] = ['remember'];

    user: string = '';
    password: string = '';
    loading: boolean = false;

    visible: boolean = true;

    constructor(
        public layoutService: LayoutService,
        private loginService: LoginService,
        private router: Router,
        private messageService: MessageService,
    ) { }

    getLogin(){
        if(this.user && this.password && this.user != '' && this.password != ''){
            this.loading = true;
            this.loginService.getLoginCredentials(this.user, this.password).subscribe({
                next: (r) => {
                    console.log(r);
                    if(r['success']){
                        console.log('success:true');
                        // localStorage.setItem('id', r['data']['id']);
                        localStorage.setItem('nombre', r['data']['nombre']);
                        localStorage.setItem('token', r['data']['token']);
                        localStorage.setItem('level', r['data']['user_level']);
                        localStorage.setItem('uid', r['data']['user_id']);
                        this.router.navigate(['/home/admin/capenh']);
                    }else{
                        this.loading = false;
                        this.messageService.add({severity: 'error', summary: 'Error', detail: r['data'], life: 3000});
                    }
                },
                error: (e) => {
                    this.loading = false;
                    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario no encontrado!!', life: 3000});
                }
            });
        }else{
            this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ingresa tus Credenciales', life: 3000});
        }

    }


}
