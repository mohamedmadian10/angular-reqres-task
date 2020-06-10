import { UiService } from './../../_services/ui.service';
import { AuthServiceService } from './../../_services/auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{
  token:string;
  isLoading = false;
  private loadedSub:Subscription;

  constructor(
    private authService:AuthServiceService,
    private router:Router,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.loadedSub = this.uiService.loadingSpinner.subscribe((loading)=>{
      this.isLoading = loading;
    })
  }
  
  //only user with email eve.holt@reqres.in is authenticated
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
      // this.token = data['token']
      // localStorage.setItem('token',this.token);
      // this.router.navigate(['/users'])

      console.log(data)
    },err=>{
      console.log(err.error.error)
      this.uiService.showSnackBar(err.error.error,null,3000,'top')

    })
  
    // form.reset();
  }

  ngOnDestroy(): void {
    this.loadedSub.unsubscribe()
  }
}
