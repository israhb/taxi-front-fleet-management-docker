import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
                ]
            },
            {
                label: 'Administracion',
                items: [
                    //{label: 'Cartera Semanal',      icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/carteraS']},
                    //{label: 'Cartera',      icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/cartera']},
                    //{label: 'Validacion',   icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/validacion']},
                    {label: 'Capenh',           icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/capenh']},
                    {label: 'Tracks',           icon: 'pi pi-fw pi-map',    routerLink: ['/home/admin/tracks']},
                   // {label: 'Grupos',      icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/grupos']},
                    {label: 'Reportes',         icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/reportes']},
                    //{label: 'R. Productividad', icon: 'pi pi-fw pi-server', routerLink: ['/home/admin/reporteProductividad']},
                    {label: 'Usuarios',         icon: 'pi pi-fw pi-users',  routerLink: ['/home/admin/usuarios']}
                ]
            }
        ];
    }
}
