import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmation: new FormControl('')
});

  public signup() {
    console.log(this.signupForm.value.email ?? '');
    console.log(this.signupForm.value.password ?? '');
    console.log(this.signupForm.value.confirmation ?? '');
  }
}
