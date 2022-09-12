import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto = null;

  constructor(
    private productoService: ProductoService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    // alert(id); comprobar si funciona por consola
    this.productoService.detail(id).subscribe({
      next: data => {
        this.producto = data;
      },
      error: err => {
        this.toastr.error(err.error, 'Fail', { //err.error.mensaje
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
    }
    });
  }
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.update(id, this.producto).subscribe({
      next: data => {
        this.toastr.success('Producto Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      error: err => {
        this.toastr.error(err.error.mensaje, 'Fail', {//err.error.mensaje
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        //this.router.navigate(['/']);
      }
    });
  }

}
