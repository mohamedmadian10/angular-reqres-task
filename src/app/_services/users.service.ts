import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/** UsersService */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;

  /**
   * constructor
   * @param {HttpClient} http 
   */
  constructor(private http: HttpClient) { }

  /**
   * getAllUsers
   * @description function to get All users
   * @returns  Observable<Object>
   */
  getAllUsers(): Observable<Object> {
    return this.http.get(this.baseUrl);
  }

  /**
   * getUserDetails
   * @description function to get user details
   * @param userId 
   * @returns {Observable<User>}
   */
  getUserDetails(userId): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(tap(user => {
      return user
    }))
  }

  /**
    * updateUser
    * @description function to update user details
    * @param {User} user
    * @returns {Observable<Object>}
    */
  updateUser(id: number, user: User): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, user)
  }

  /**
   * addUser
   * @param {User} user 
   * @description function to Add user
   * @returns Observable<Object>
   */
  addUser(user: User): Observable<Object> {
    return this.http.post(this.baseUrl, user);

  }

  //delete user
  /**
   * deleteUser
   * @param {number} id 
   * @returns {Observable<Object>}
   */
  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
