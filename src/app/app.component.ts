import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './_services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string ='reqres-app'
  /**
   * constructor
   * @param authService 
   */
  constructor(private authService:AuthServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
