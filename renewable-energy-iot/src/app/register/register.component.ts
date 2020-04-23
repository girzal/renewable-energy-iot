import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService, UserRegister } from '@/_services/user.service';
import { AlertService } from '@/_services/alert.service';
import { AuthenticationService } from '@/_services/index.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  toVerifyEmail: boolean = false;
  userName: string;

  private userRegister: UserRegister = {
    email : "",
    DeviceID : "",
    Name : "",
    Location : ""
};
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      device_id: ['', Validators.required],
      location: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

   
  // }


  singUpToAWS() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

    this.userName = this.registerForm.value.email;

    const user = {
      username: this.registerForm.value.email,
      password: this.registerForm.value.password,
      attributes: {
          email: this.registerForm.value.email
          // other custom attributes 
      }
    }

    
    Auth.signUp(user)
      .then(data => {
        console.log(data);
        this.loading = false;
        this.toVerifyEmail = true;
      })
      .catch(err => console.log(err));

  }

  onVerify(verifycode: HTMLInputElement) {
    // After retrieving the confirmation code from the user
    Auth.confirmSignUp(this.userName, verifycode.value, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
      }).then(data => {
        console.log(data);
        this.toVerifyEmail = false;

        
        this.userRegister.email = this.registerForm.value.email;
        this.userRegister.DeviceID = this.registerForm.value.device_id;
        this.userRegister.Name = this.registerForm.value.userName;
        this.userRegister.Location = this.registerForm.value.location;


        this.userService.register(this.userRegister)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.loading = false;
        });

      })
        .catch(err => console.log(err));
  }


}
