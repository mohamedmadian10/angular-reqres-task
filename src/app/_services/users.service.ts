import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private baseUrl:string ="https://reqres.in/api/users";

  constructor(private http:HttpClient) { }
  getAllUsers(){
    return this.http.get(this.baseUrl);
  }
  //get user details
  getUserDetails(userId):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(tap(user=>{
       return user
    }))
  }

  //update user

  updateUser(user:User){
    return this.http.put(`${this.baseUrl}/${user.id}`,user)
  }

  //creating user
  addUser(user:User){
    return this.http.post(this.baseUrl,user);

  }

  //delete user
  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
