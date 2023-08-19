import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from 'src/app/_services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleNav = new EventEmitter();
  /**
   * constructor
   * @param {AuthServiceService} authService 
   */
  constructor(private authService: AuthServiceService) { }

  public ngOnInit(): void { }
  get islogged(): boolean {
    return this.authService.isLogedIn()
  }

  /**
   * onToggle
   * @description function to toggle nav bar
   */
  public onToggle(): void {
    this.toggleNav.emit()
  }
  /**
   * onLogout
   * @description function to handle logout
   */
  public onLogout(): void {
    this.authService.logOut();
  }

}
