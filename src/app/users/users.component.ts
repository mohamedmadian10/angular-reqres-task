import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { User } from '../_models/user.model';
import { AuthServiceService } from '../_services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';


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
    this.userService.getAllUsers().subscribe(users=>{
      // this.users = users.data;
      this.usersList =users['data'];

    })

   
  }
  
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
            })
            
          }
        });
    

  }
}
