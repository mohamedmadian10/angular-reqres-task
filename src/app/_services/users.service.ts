import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private baseUrl:string ="https://reqres.in/api/users";
  constructor(private http:HttpClient) { }
  getAllUsers(){
    return this.http.get(this.baseUrl);
  }
}
