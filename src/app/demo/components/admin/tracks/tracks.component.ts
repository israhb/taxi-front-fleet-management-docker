import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MapInfoWindow, MapMarker} from '@angular/google-maps';
import { UsuariosService } from 'src/app/demo/service/admin/usuarios/usuarios.service';
import { TracksService } from 'src/app/demo/service/admin/tracks/tracks.service';
import { ToolsService } from 'src/app/demo/service/tools/tools.service';
import { CarteraService } from 'src/app/demo/service/admin/cartera/cartera.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TracksComponent implements OnInit{

    usuariosService = inject(UsuariosService);
    tracksService   = inject(TracksService);
    toolsService    = inject(ToolsService);
    carteraService      = inject(CarteraService);

    ///filtros
    form_filterG_model_region: number; form_filterG_option_region: any[];
    form_filterG_model_gerencia: number; form_filterG_option_gerencia: any[];
    form_filterG_model_cedi: number; form_filterG_option_cedi: any[];
    filter_model_users: number; filter_options_users: any[];
    filter_model_date: string;

    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

    data_info_user: string;

    //data por default
    zoom: number = 5;
    center: any = {
        lat: 19.424811,
        lng: -99.130039
    };

    markerOptions: google.maps.MarkerOptions = {
        draggable: false,
        icon: {
            url: "https://c2.tmsglobal.com.mx/img/markers/circle_marker.png",
        }
    };

    markerOptions_1: google.maps.MarkerOptions = {
        draggable: false,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        }
    };
    markerOptions_2: google.maps.MarkerOptions = {
        draggable: false,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }
    };
    markerPositions_1: google.maps.LatLngLiteral[] = [];
    markerPositions_2: google.maps.LatLngLiteral[] = [];
    data_info_coor_init: any;
    data_info_coor_final: any;
    data_coordenada_inicio_lat: any;
    data_coordenada_inicio_lng: any;
    data_coordenada_final_lat: any;
    data_coordenada_final_lng: any;

    heatmapOptions = {radius: 10};
    heatmapData = [];
    data_coordenadas_usuario: any;
    ///
    data_tacks: any[];

    //markers api diferent
    markersApi = [];
    image_marker: string;

    constructor(
        private messageService: MessageService
    ) { }


    ngOnInit(): void {
        this.filter_model_date = this.toolsService.formatDateNow();
        this.selectores();
    }

    selectores(){
        if(!this.form_filterG_option_region){
            this.carteraService.getRegiones().subscribe({
                next: (r) => {
                    this.form_filterG_option_region = r;
                }
            });
        }
    }

    filtrar(){
        if(!this.filter_model_users && !this.filter_model_date){
            this.messageService.add({
                severity: 'info',
                summary: 'Error!',
                detail: 'Selecciona un usuario o una fecha para filrar la informacion',
                life: 5000
            });
        }else{
            this.filter_model_date = this.filter_model_date && this.filter_model_date.length <= 10
            ?  this.filter_model_date : this.toolsService.formatDateInputs(this.filter_model_date, false, false);
            this.tracksService.postListadotracks(this.form_filterG_model_region, this.form_filterG_model_gerencia, this.form_filterG_model_cedi, this.filter_model_users,
                this.filter_model_date).subscribe({
                next: (r) => {
                    var dt = r;
                    let arrayCoordenadas = new Array();
                    let arrayCoordenadasNombre = new Array();
                    if(dt[0].username){

                        for(var i in dt){
                            if(dt[i].points[0][0]){
                                ///corrdenadas inicio
                                const latSt = dt[i].points[0][0].lat
                                const lngSt = dt[i].points[0][0].lng
                                const dateIni = dt[i].points[0][0].date;
                                const timeIni = dt[i].points[0][0].time;
                                this.data_info_coor_init = { date: dateIni, time: timeIni, name: dt[0].username };
                                this.data_coordenada_inicio_lat = parseFloat(latSt);
                                this.data_coordenada_inicio_lng = parseFloat(lngSt);

                                const idx = dt[i].points.length - 1
                                const idx1 = dt[i].points[idx].length - 1
                                //coordenadas finles
                                const latNd = dt[i].points[idx][idx1].lat
                                const lngNd = dt[i].points[idx][idx1].lng
                                const dateFin = dt[i].points[idx][idx1].date;
                                const timeFin = dt[i].points[idx][idx1].time;
                                this.data_info_coor_final = { date: dateFin, time: timeFin, name: dt[0].username };
                                this.data_coordenada_final_lat = parseFloat(latNd);
                                this.data_coordenada_final_lng = parseFloat(lngNd)

                                const arrPath = []
                                for(var j in dt[i].points){
                                    for(var k in dt[i].points[j]){
                                        arrPath.push([dt[i].points[j][k].lat,dt[i].points[j][k].lng]);
                                        let json = {
                                            lat: parseFloat(dt[i].points[j][k].lat), lng: parseFloat(dt[i].points[j][k].lng)
                                        };
                                        let jsonNombres = {
                                            date: dt[i].points[j][k].date, time: dt[i].points[j][k].time, name: dt[0].username
                                        };
                                        arrayCoordenadas.push(json);
                                        arrayCoordenadasNombre.push(jsonNombres);
                                    }
                                }
                                this.heatmapData = arrayCoordenadas;
                                this.data_tacks = arrayCoordenadasNombre;

                                this.center = {lat: this.data_coordenada_inicio_lat, lng: this.data_coordenada_inicio_lng};
                                this.zoom = 12;

                                this.markerPositions_1 = [
                                    {lat: this.data_coordenada_inicio_lat, lng: this.data_coordenada_inicio_lng}
                                ];
                                 //ultimo marker
                                this.markerPositions_2 = [
                                    {lat: this.data_coordenada_final_lat, lng: this.data_coordenada_final_lng}
                                ];
                            }
                        }
                    }else{
                        this.zoom = 5;
                        this.center= {
                            lat: 19.424811,
                            lng: -99.130039
                        };
                        this.heatmapData = [];
                        this.markerPositions_1 = [];
                        this.markerPositions_2 = [];
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Error!',
                            detail: 'Sin Información',
                            life: 5000
                        });
                    }
                },
                complete: () => {
                    this.tracksService.postListadoMarkers( this.filter_model_users, this.filter_model_date).subscribe({
                        next: (r) => {
                            if( r ){
                                this.markersApi = r.map(marker => ({
                                    position: {
                                      lat: parseFloat(marker.lat),
                                      lng: parseFloat(marker.lng),
                                    },
                                    options: {
                                        icon: {
                                        url: Number(marker.valCar_gepp_rev) === 1
                                            ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                            : "https://c2.tmsglobal.com.mx/img/markers/circle_marker.png"
                                        }
                                    },
                                    name: marker.valCar_nombre,
                                    tel: marker.valCar_tel_mot,
                                    status: marker.valCar_val_status,
                                    ban: marker.valCar_band_capen,
                                    foto: marker.valCar_f1
                                  }));
                            }
                        }
                    });
                }
            });
        }
    }

    selectedCombo(index: number){
        if(index === 0){
            if(!this.form_filterG_model_region){
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;

                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
            }else{
                this.form_filterG_option_gerencia = null;
                this.form_filterG_model_gerencia = null;
                this.carteraService.getGerencia(this.form_filterG_model_region).subscribe({
                    next: (r) => {
                        this.form_filterG_option_gerencia = r;
                    }
                });
            }
        }
        if(index === 1){
            if(!this.form_filterG_model_gerencia){
                this.form_filterG_option_cedi = null;
                this.form_filterG_model_cedi = null;
            }else{
                if(this.form_filterG_model_gerencia != -1){
                    this.form_filterG_option_cedi = null;
                    this.form_filterG_model_cedi = null;
                    this.carteraService.getCedi(this.form_filterG_model_gerencia).subscribe({
                        next: (r) => {
                            this.form_filterG_option_cedi = r;
                        }
                    });
                }
            }
        }
        if(index === 2){
            if(!this.form_filterG_model_cedi){
                this.filter_options_users = null;
                this.filter_model_users = null;
            }else{
                if(this.form_filterG_model_cedi != -1){
                    this.filter_model_date = this.filter_model_date && this.filter_model_date.length <= 10
                    ?  this.filter_model_date : this.toolsService.formatDateInputs(this.filter_model_date, false, false);

                    this.filter_options_users = null;
                    this.filter_model_users = null;
                    this.carteraService.getUsuarios(this.form_filterG_model_region, this.form_filterG_model_gerencia, this.form_filterG_model_cedi,
                        this.filter_model_date).subscribe({
                        next: (r) => {
                            this.filter_options_users = r;
                        }
                    });
                }
            }
        }
    }

    openInfoWindow(marker: MapMarker, dataIndex: number, initMar: boolean) {
        this.image_marker = '';
        if(dataIndex == 0 && initMar){
            this.data_info_user = `${this.data_info_coor_init['date']}\n${this.data_info_coor_init['time']}`;
        }else if(dataIndex == 1 && initMar){
            this.data_info_user = `${this.data_info_coor_final['date']}\n${this.data_info_coor_final['time']}`;
        }else{
            this.data_info_user = `${this.data_tacks[dataIndex]['date']}\n${this.data_tacks[dataIndex]['time']}`;
        }
        this.infoWindow.open(marker);
    }

    onMarkerClick(data: any, marker: MapMarker): void {
        let estatus = '';
        let estatusCapen = [
            { id: 1, name: 'Alta' },
            { id: 2, name: 'Rechazado' },
            { id: 3, name: 'Nuevo' },
            { id: 6, name: 'Pendiente por validar' },
            { id: 8, name: 'Confirmado' },
            { id: 9, name: 'Progreso' },
            { id: 10, name: 'Pre Validado' }
        ];
        let estatusDDM = [
            { id: 0, name: 'Por Visitar' },
            { id: 1, name: 'Mal servicio' },
            { id: 2, name: 'Modificacion' },
            { id: 3, name: 'Baja' },
            { id: 4, name: 'Sin Problema' }
        ];
        if(data.ban == 1){//capen
            let resultado = estatusCapen.filter( r => r.id == parseInt(data.status) );
            estatus = resultado && resultado.length > 0 ? resultado[0]['name'] : '';
        }else{//else ddm
            let resultadoDDM = estatusDDM.filter( r => r.id == parseInt(data.status) );
            estatus = resultadoDDM && resultadoDDM.length > 0 ? resultadoDDM[0]['name'] : '';
        }
        this.image_marker = data.foto;
        this.data_info_user = `${data.name}\n${data.tel}\n${estatus}`;
        this.infoWindow.open(marker);
      }

}


