import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
user:User = {email:'',first_name:'',last_name:'',avatar:''};
  constructor(private userService:UsersService,@Inject(MAT_DIALOG_DATA) public passedData:any) { };

  
  ngOnInit(): void {
    this.user = this.passedData.newUser;
    console.log(this.user);

  }

  onCreate(){
    this.userService.addUser(this.user).subscribe(user=>{
      console.log('user logged succesfully',user)
    })

  }

}
