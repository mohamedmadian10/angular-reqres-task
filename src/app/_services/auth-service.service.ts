import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../_models/auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl:string ="https://reqres.in/api/login";

  private isAuthenticated:boolean = false;
  authenticationChange= new Subject<boolean>();

  constructor(private http: HttpClient,private rouer:Router) { 
    this.isAuthenticated = !!localStorage.getItem('token');
  }


  //login user
  login(authData:AuthData){
    return this.http.post(this.authUrl,{
      email:authData.email,
      password:authData.password
    }).pipe(tap(user=>{
      // check token existance and store it
      if(user['token']) {
        this.isAuthenticated =true;
        localStorage.setItem('token',user['token']);
        this.authenticationChange.next(true);
        this.rouer.navigate(['/users'])
      }else{
        this.authenticationChange.next(false);
        this.isAuthenticated =false;
      }
    }))
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.isAuthenticated =false;
    this.rouer.navigate([''])
  }
  
  //check user auth state
  isLogedIn(){
    return this.isAuthenticated;
  }
}
