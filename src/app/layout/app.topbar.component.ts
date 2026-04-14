import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    usuario: string = '';
    constructor(
        public layoutService: LayoutService,
        private router:Router
    ) {
        this.usuario = localStorage.getItem('nombre');
     }

    cerrarSesion(){
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
