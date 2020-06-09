import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private userService:UsersService,@Inject(MAT_DIALOG_DATA) public passedData:any) { }
 user:User;
  ngOnInit(): void {
    this.user = this.passedData.editetedUser;

    console.log(this.user);
    
  }
  onUpdate(form:NgForm){
    this.userService.updateUser({
      email:form.value.email,
      first_name:form.value.first_name,
      last_name:form.value.last_name,
      avatar:form.value.avatar,
      id:this.user.id
      
    })
    // console.log(form.value)

  }

}
