import { Component, OnInit, OnDestroy,Output,EventEmitter } from '@angular/core';
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
  @Output()toggleNav =  new EventEmitter();
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    // this.authSub = this.authService.authenticationChange.subscribe(authStateChange=>{
    //   this.isAuth = authStateChange;
    // })
  }
  get islogged(){
    return this.authService.isLogedIn()
  }

  onToggle(){
    this.toggleNav.emit()
  }
  onLogout(){
    this.authService.logOut();
  }
  
  //unSubscribe on auth state to protect memory leak
  ngOnDestroy(){
    // this.authSub.unsubscribe()
  }
}
