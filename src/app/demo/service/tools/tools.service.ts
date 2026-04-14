import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

    constructor() { }
    //funcion para generar numeros consecutivos en una tabla
    getGenerateNumeracionTables(json: any) {
        let count = 1;
        let jsonFinal = new Array();
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            element['numeracion'] = count;
            jsonFinal.push(element);
            count++;
        }
        return jsonFinal;
    }

    getPutJsonTodos(data: any[]) {
        let jsonFinal = new Array();
        let jsonP = {i: -1, d: 'Todos' };
        jsonFinal.push(jsonP);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            jsonFinal.push(element);
        }
        return jsonFinal;
    }

    formatDateNow(){
        var u = new Date();
        return `${u.getFullYear()}-${('0'+(u.getMonth()+1)).slice(-2)}-${('0'+u.getDate()).slice(-2)}`;
    }

    formatDateInputs(dates: string, banderaCreateUpdate: boolean, modDayMonYear: boolean){
        if(!dates){
            return dates;
        }else{
            if (banderaCreateUpdate) {
                let dividir_fecha = dates.split("-");
                return dates = `${dividir_fecha[2]}-${dividir_fecha[1]}-${dividir_fecha[0]}`;
            } else {
                if (modDayMonYear) {//12-12-2022
                    var u = new Date(Date.parse(dates));
                    return `${('0'+u.getDate()).slice(-2)}-${('0'+(u.getMonth()+1) ).slice(-2)}-${u.getFullYear()}`;
                } else {//2022-12-12
                    var u = new Date(Date.parse(dates));
                    return `${u.getFullYear()}-${('0'+(u.getMonth()+1)).slice(-2)}-${('0'+u.getDate()).slice(-2)}`;
                }
            }
        }
    }

    saveAsExcelFile(buffer: any, fileName: string): void { //Función para descarga de archivo Excel
        let EXCEL_TYPE = 'text/csv;charset=utf-8';
        let EXCEL_EXTENSION = '.csv';

        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + ' - ' + this.GetDate() + EXCEL_EXTENSION);
    }
    GetDate() { //Función de fecha completa para el archivo de excel
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const newDate = new Date();
        const day = days[newDate.getDay()];
        const hr = newDate.getHours() % 12 || 12;
        const min = newDate.getMinutes();
        const ampm = hr > 12 ? 'p.m.' : 'a.m.' ;
        const date = newDate.getDate();
        const month = months[newDate.getMonth()];
        const year = newDate.getFullYear();
        return `${day} ${hr}:${min} ${ampm } - ${date} ${month} ${year}`;
    }
}
