import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'carteraS', data: { breadcrumb: 'Cartera Semanal' }, loadChildren: () => import('./cartera-s/cartera-s.module').then(m => m.CarteraSModule) },
        { path: 'cartera', data: { breadcrumb: 'Cartera' }, loadChildren: () => import('./cartera/cartera.module').then(m => m.CarteraModule) },
        { path: 'validacion', data: { breadcrumb: 'Validacion' }, loadChildren: () => import('./validacion/validacion.module').then(m => m.ValidacionModule) },
        { path: 'capenh', data: { breadcrumb: 'Capenh' }, loadChildren: () => import('./capenh/capenh.module').then(m => m.CapenhModule) },
        { path: 'tracks', data: { breadcrumb: 'Tracks' }, loadChildren: () => import('./tracks/tracks.module').then(m => m.TracksModule) },
        { path: 'grupos', data: { breadcrumb: 'Grupos' }, loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule ) },
        { path: 'reportes', data: { breadcrumb: 'Reportes' }, loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule ) },
        { path: 'reporteProductividad', data: { breadcrumb: 'Reporte Productividad' }, loadChildren: () => import('./reporteP/reporteP.module').then(m => m.ReportePModule ) },
        { path: 'usuarios', data: { breadcrumb: 'Usuarios' }, loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },

    ])],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
