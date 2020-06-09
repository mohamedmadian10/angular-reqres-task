import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { User } from '../_models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { ConfirmDialoge } from './confirm-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user:User= {email:'',first_name:'',last_name:'',avatar:''};
  usersList:User[] = [];

  constructor(
    private userService:UsersService,
    private dialog:MatDialog,
    private router:Router
    ) { }
  ngOnInit() {
    //get All users
    this.userService.getAllUsers().subscribe(users=>{
      this.usersList =users['data'];
    })   
  }

  //delete User
  onDelet(deluser){
    // open dialog to confirm deleting
    const dialogRef = this.dialog.open(ConfirmDialoge,{
      width:'300px',
      data:{
        newUser:this.user
      }
    })
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.userService.deleteUser(deluser.id).subscribe(deleted=>{
          console.log(deluser.id)
          console.log('del',deleted)
          this.usersList = this.usersList.filter(user=>{
            return user.id !== deluser.id
          })
    
        })

      }}
    )};

  //create new user
  openAddMode(){
    const dialogRef = this.dialog.open(UserCreateComponent,{
          width:'600px',
          height:'600px',
          data:{
            newUser:this.user
          }
        })
        dialogRef.afterClosed().subscribe(data=>{
          if(data){
            console.log(this.user,'back');
            this.userService.addUser(this.user).subscribe((addedUser:any)=>{
              // this.user = updated
              console.log('created',addedUser);
              // this.router.navigate(['/users'])
              this.usersList.splice(0,0,addedUser)
            })
            
          }
        });
       }
}
