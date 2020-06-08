import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../_models/auth-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl:string ="https://reqres.in/api/login";

  private isAuthenticated:boolean = false;

  constructor(private http: HttpClient) { 
    this.isAuthenticated = !!localStorage.getItem('token');
  }


  //login user
  login(authData:AuthData){
    return this.http.post(this.authUrl,{
      email:authData.email,
      password:authData.password
    }).pipe(tap(user=>{
      //check token existance and store it
      // if(user.token) localStorage.setItem('token',user.token)
    }))
  }
  
  
  
  //check user auth state
  isLogedIn(){
    return this.isAuthenticated;
  }
}
