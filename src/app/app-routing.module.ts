import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './_services/auth-guard.service';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'users',loadChildren:()=>import('./users/users/users.module').then(m=>m.UsersModule),canLoad: [AuthGuardService]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
