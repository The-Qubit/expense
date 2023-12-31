import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

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

  constructor(private userService: UserService, private router: Router) { }

  public login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
        this.loginInvalid = false;
        this.userService.setToken(data.token)
        this.userService.setUserId(data.id)
        this.router.navigate(['/dashboard']);
      },
      (_error) => {
        this.loginInvalid = true;
      })
    }
  }
}
