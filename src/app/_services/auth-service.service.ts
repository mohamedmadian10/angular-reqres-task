import {  tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../_models/auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/** AuthServiceService */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  /** authUrl */
  private authUrl: string = environment.authUrl;
  /** isAuthenticated */
  private isAuthenticated: boolean = false;
  /** authenticationChange */
  public authenticationChange = new Subject<boolean>();

  /**
   * constructor
   * @param {HttpClient} http 
   * @param {Router} rouer 
   */
  constructor(private http: HttpClient, private rouer: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }


  /**
   * login
   * @description fuction to handle login 
   * @param {AuthData} authData 
   * @returns  {Observable}<Object>
   */
  public login(authData: AuthData): Observable<Object> {
    return this.http.post(this.authUrl, {
      email: authData.email,
      password: authData.password
    }).pipe(tap(user => {
      // check token existance and store it
      if (user['token']) {
        this.isAuthenticated = true;
        localStorage.setItem('token', user['token']);
        this.authenticationChange.next(true);
        this.rouer.navigate(['/users'])
      } else {
        this.authenticationChange.next(false);
        this.isAuthenticated = false;
      }
    }))
  }

  /**
   * logOut
   * @description fuction to handle logOut
   * @returns void
   */
  logOut(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.rouer.navigate([''])
  }

  /**
   * isLogedIn
   * @description fuction to check logedIn user state
   * @returns void
   */
  isLogedIn() {
    return this.isAuthenticated;
  }
}
