import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})

export class ListaProductoComponent implements OnInit {

  productos2: Array<any>;
  productos: Producto[] = [];
  page: number = 0;
  size: number = 4;
  order: string = 'id';
  asc: boolean = true;

  isFirst: boolean = false;
  isLast: boolean = false;

  totalPages: Array<number>;

  criterio = '';

  //roles: string[]; video 15
  isAdmin = false;

  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService,
    private tokenService: TokenService,
    ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarProductos2();
    /*this.roles = this.tokenService.getUserAuthorities(); video 15
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })*/
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe({
      next: data => {this.productos = data;
      },
      error: err => console.log(err)
    })
  }

  cargarProductos2(): void {
    this.productoService.productos(this.page, this.size, this.order, this.asc).subscribe({
      next: data => {
        this.productos2 = data.content; //data.content
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data['totalPages']);
        console.log(data);
      },
      error: err => {
        console.log(err.error);}
      })
  }

  sort(): void {
    this.asc = !this.asc;
    this.cargarProductos2();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.cargarProductos2();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.cargarProductos2();
    }
  }

  setPages(page:number): void {
    this.page = page;
    this.cargarProductos2();
  }

  setOrder(order:string){
    this.order = order;
    this.cargarProductos2();
  }

  borrar(id: any){
    //alert ('borrar el ' + id); para probar sin borrar de la Base de Datos
    this.productoService.delete(id).subscribe({
      next: data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      error: err => {
        this.toastr.error(err.error.mensaje, 'Fail', { //err.error.mensaje
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    });
  }
}