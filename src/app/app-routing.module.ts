import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ChangePasswordComponent } from './changepassword/change-password.component';
import { SendEmailComponent } from './changepassword/send-email.component';
import { LoginGuard } from './guards/login.guard';
import { ProdGuardService} from './guards/prod-guard.service';
import { IndexComponent } from './index/index.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { ListaProductoComponent } from './producto/lista-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';


const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'login', component:LoginComponent, canActivate: [LoginGuard]},
  {path:'registro', component:RegistroComponent, canActivate: [LoginGuard]},
  {path:'sendemail', component:SendEmailComponent, canActivate: [LoginGuard]},
  {path:'change-password/:tokenPassword', component:ChangePasswordComponent, canActivate: [LoginGuard]},
  {path:'lista', component: ListaProductoComponent, canActivate:[ProdGuardService],data:{expectedRol:['admin', 'user']}},
  {path:'detalle/:id', component: DetalleProductoComponent,canActivate:[ProdGuardService],data:{expectedRol:['admin', 'user']}},
  {path:'nuevo', component: NuevoProductoComponent,canActivate:[ProdGuardService],data:{expectedRol:['admin']}},
  {path:'editar/:id', component: EditarProductoComponent,canActivate:[ProdGuardService],data:{expectedRol:['admin']}},
  {path:'**', redirectTo: '', pathMatch:'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
