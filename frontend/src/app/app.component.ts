import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = "Expense Tracker";
  // @ts-ignore 
  message: string;

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
