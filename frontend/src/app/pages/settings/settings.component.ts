import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user.service';

type Currency = {
  abbreviation: string;
  name: string;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  
  currencies: Currency[] = [{abbreviation: "D" , name: "$ | Dollar"}, {abbreviation: "E" , name: "€ | Euro"}, {abbreviation: "Y" , name: "¥ | Yen"},{abbreviation: "P" , name: "£ | Pound"}];

  currencyForm: FormGroup;

  constructor(private userService: UserService) {
    this.currencyForm = new FormGroup({
      currency: new FormControl(null)
    });
    this.currencyForm.controls['currency'].setValue(userService.getCurrencyAbbreviation());
  }

  updateCurrency(value: any) {
    this.userService.updateCurrency(value.target.value).subscribe();
  }
}
