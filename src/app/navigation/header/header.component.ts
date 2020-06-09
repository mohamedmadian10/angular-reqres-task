import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // isAuth = false;
  // authSub:Subscription;
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    // this.authSub = this.authService.authenticationChange.subscribe(authStateChange=>{
    //   this.isAuth = authStateChange;
    // })
  }
  get islogged(){
    return this.authService.isLogedIn()
  }
  onLogout(){
    this.authService.logOut();
  }
  
  //unSubscribe on auth state to protect memory leak
  ngOnDestroy(){
    // this.authSub.unsubscribe()
  }
}
