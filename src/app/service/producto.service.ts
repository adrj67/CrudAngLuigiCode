import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = environment.productoURL;
  productoURL2= environment.productoURL2

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista');
  }

  public productos(page:number, size: number,order: string, asc:boolean): Observable<any>{
    return this.httpClient.get<any>(this.productoURL2 + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  public detail(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`);
  }

  public detailnombre(nombre: string): Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoURL + `detail/${nombre}`);
  }

  public save(producto: Producto): Observable<any>{
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id:number, producto: Producto): Observable<any>{
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
