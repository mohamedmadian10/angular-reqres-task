import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/_services/auth-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  isAuth = false;
  subscription: Subscription;
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {

  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  get islogged() {
    return this.authService.isLogedIn();
  }

  onLogout() {
    this.authService.logOut();
  }
}
