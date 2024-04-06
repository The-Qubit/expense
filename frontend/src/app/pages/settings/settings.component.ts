import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  
  constructor(private userService: UserService) {}

  updateCurrency(value: any) {
    this.userService.updateCurrency(value.target.value).subscribe();
  }
}
