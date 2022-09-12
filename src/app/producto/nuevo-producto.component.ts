import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  nombre: string ='';
  precio: number = 0;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe({
      next: data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      error: err => {
        this.toastr.error(err.error.mensaje, 'Fail', { //err.error.mensaje
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        //this.router.navigate(['/']);
      }
    })
  }

}
