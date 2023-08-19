import { NgModule } from '@angular/core';
import { UsersComponent } from './users-list/users.component';
import { UserDyamicDialogComponent } from './user-dynamic-dialog/user-dyamic-dialog.componen';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ConfirmDialoge } from './confirm-dialog.component';






@NgModule({
  declarations: [
    UsersComponent,
    UserDyamicDialogComponent,
    ConfirmDialoge
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  entryComponents: [UserDyamicDialogComponent]
})
export class UsersModule { }
