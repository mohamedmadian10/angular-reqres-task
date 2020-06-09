import { NgModule } from '@angular/core';
import { UsersComponent } from '../users.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from '../users-routing.module';
import { ConfirmDialoge } from '../confirm-dialog.component';






@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserCreateComponent,
    ConfirmDialoge
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
   

  ]
})
export class UsersModule { }
