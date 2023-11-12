import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginInvalid = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private apiService: DataService, private router: Router) { }

  public login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
        this.loginInvalid = false;
        this.apiService.setToken(data.token)
        this.router.navigate(['/dashboard']);
      },
      (_error) => {
        this.loginInvalid = true;
      })
    }
  }
}
