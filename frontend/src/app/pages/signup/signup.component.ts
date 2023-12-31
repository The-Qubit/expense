import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  emailInvalid = false;
  passwordsInvalid = false;

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) { }

  public signup() {
    if (!(this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.confirmation)) {
      return
    }
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.passwordsInvalid = ((password) !== (this.signupForm.value.confirmation));
    this.userService.isEmailUsed(email).subscribe((data) => {
      this.emailInvalid = data.is_used;
      if (this.emailInvalid || this.passwordsInvalid) {
        return
      } else {
        this.userService.signUp(email, password).subscribe()
        this.router.navigate(['/login']);
      }
    });
  }
}
