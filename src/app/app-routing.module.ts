import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { UserDetailsComponent } from './users/user-details/user-details.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'users',component:UsersComponent,canActivate:[AuthGuardService]},
  {path :'users/:id',component:UserDetailsComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
