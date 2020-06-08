import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService:UsersService) { }
  users = [];
  ngOnInit() {
    this.userService.getAllUsers().subscribe(users=>{
      // this.users = users.data;
      console.log(users)
    })
  }

}
