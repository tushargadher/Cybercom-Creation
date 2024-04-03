import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  imageURL = '../../../assets/images/loginFormimg.jpg';
  isloading = false;
  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  //creating getters

  get name() {
    return this.signUpForm.get('username');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  handleSignUpForm() {
    console.log(this.signUpForm.value);

    const credential = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };

    this.isloading = true;
    this.authService.register(credential).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isloading = false;
        this.toastr.success('User Registration Successfully');

        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error);
        this.isloading = false;
        this.toastr.error(error.error.error.message);
      },
    });
    this.signUpForm.reset();
  }
}
