import { Pipe, PipeTransform } from '@angular/core';

 @Pipe({
    name: 'filter'
 })

 export class FilterPipe implements PipeTransform { 

    transform(value: any, arg: any): any { 
        if(!arg || arg?.length < 3) return value; //comienza a buscar en la tercer letra escrita
        let result: any = []; 
        
        for(let producto of value){ 
            if(producto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){ // toLowerCase:compara en minusculas
                result.push(producto); 
            };
         }; return result; } }