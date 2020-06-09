import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authSer:AuthServiceService,private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if(this.authSer.isLogedIn()) return true;
    //navigate user to login
    this.router.navigate([''])
  }
//protect unauthenticated urls
  canLoad(
    route:Route
    
  ): Observable<boolean> | Promise<boolean> | boolean {
     if (this.authSer.isLogedIn()) return true;

      this.router.navigate(['']);

  }
}
