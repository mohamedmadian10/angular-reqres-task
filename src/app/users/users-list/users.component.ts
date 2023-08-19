import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { User } from '../../_models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDyamicDialogComponent } from '../user-dynamic-dialog/user-dyamic-dialog.componen';
import { ConfirmDialoge } from '../confirm-dialog.component';
import { UiService } from '../../_services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  /** isLoading */
  public isLoading = false;
  /** usersSub */
  usersSub$: Subscription = new Subscription();

  user: User = { email: '', first_name: '', last_name: '', avatar: '' };
  usersList: User[] = [];

  /**
   * constructor
   * @param {UsersService} userService 
   * @param {MatDialog} dialog 
   * @param {Router} router 
   * @param {UiService} uiService
   */
  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private router: Router,
    private uiService: UiService
  ) { }
  ngOnInit() {
    this.getAllUsers();
  }

  /**
   * getAllUsers
   * @returns void
   */
  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.usersList = users['data'];
    })
  }

  /**
   * onDelet
   * @description function to delete user
   */
  onDelet(deletedUser) {
    // open dialog to confirm deleting
    const dialogRef = this.dialog.open(ConfirmDialoge, {
      width: '300px',
      data: {
        newUser: this.user
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.removeUser(deletedUser);
      }
    });
  };

  /**
  * openDynamicDialog
  * @description fuction to open dynamic form dialog to handle add and update users
  * @param mode 
  * @param data 
  */
  public openDynamicDialog(mode: string, data?: User): void {
    const dialogRef = this.dialog.open(UserDyamicDialogComponent, {
      data: { mode, user: { ...data } }
    });
    dialogRef.afterClosed().subscribe((user) => {
      console.log(user);
      if (!user) return;

      user && user.mode === 'Update' ? this.updateUser(data.id, user.user) : this.createUser(user.user);
    })
  }

  /**
  * updateUser
  * @description fuction to update user
  * @param id 
  * @param user 
  */
  public updateUser(id: any, user: User): void {
    this.isLoading = true;
    this.usersSub$.add(
      this.userService.updateUser(id, user).subscribe((updateduser: User) => {
        this.isLoading = false;
        this.uiService.showSnackBar('  user updated successfully!', null, 3000, 'top')
        this.usersList = this.usersList.filter((value) => {
          if (value.id == id) {
            value.email = updateduser.email;
            value.first_name = updateduser.first_name;
            value.last_name = updateduser.last_name;
            value.avatar = updateduser.avatar;
          }
          return true;
        });
      })
    )
  }

  /**
   * createUser
   * @returns void
   */
  public createUser(user: User): void {
    this.isLoading = true;
    this.usersSub$.add(
      this.userService.addUser(user).subscribe((addedUser: any) => {
        this.isLoading = false;
        this.uiService.showSnackBar(' A new user created successfully!', null, 3000, 'top')
        this.usersList = [addedUser, ...this.usersList]
      })
    );
  }

  /**
   * removeUser
   * @param deletedUser 
   */
  public removeUser(deletedUser: User) {
    this.isLoading = true;
    this.usersSub$.add(
      this.userService.deleteUser(deletedUser.id).subscribe(() => {
        this.isLoading = false;
        this.uiService.showSnackBar('  user removed successfully!', null, 3000, 'top')
        this.usersList = this.usersList.filter(user => {
          return user.id !== deletedUser.id
        })

      })
    );
  }
  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    this.usersSub$.unsubscribe();
  }
}
