import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user:User;

  constructor(
    private userService:UsersService,
    private aRoute:ActivatedRoute,
    private dialog:MatDialog,
    private router:Router
    ) { }
  ngOnInit(): void {
    let id = this.aRoute.snapshot.params['id'];
    console.log(id)
    this.userService.getUserDetails(id).subscribe((user:any)=>{
      console.log(user);
      this.user = user['data'];
      console.log(user);

      console.log(this.user,'fiest')

    })
  }


  onOpenEdit(){
    
      const dialogRef = this.dialog.open(UserEditComponent,{
        width:'600px',
        height:'600px',
        data:{
          editetedUser:this.user
        }
      })
      dialogRef.afterClosed().subscribe(data=>{
        if(data){
          console.log(this.user,'back');
          this.userService.updateUser(this.user).subscribe((updated:any)=>{
            this.user = updated
            console.log('updated',updated)
            // this.router.navigate(['/users'])
          })
          
          
        }else{
          
        }
      });
  }

  //deleting user
  onDeleteUser(){
    console.log(this.user.id)
    if(this.user){
      this.userService.deleteUser(this.user.id).subscribe(data=>{
        console.log('deleted',data)
        this.router.navigate(['/users'])
      })
    }
    
  }

}
