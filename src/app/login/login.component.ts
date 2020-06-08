import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../_services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    if(!form.valid){
      return;
    }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login({
      email:email,
      password:password 
    }).subscribe(data=>{
      console.log(data)
    },err=>{
      console.log(err)
    })
  
    // form.reset();
  }
}
