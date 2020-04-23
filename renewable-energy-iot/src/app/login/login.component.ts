import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '@/_services/index.service';
import { first } from 'rxjs/operators';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  toVerifyEmail: boolean = false;
  userName: string;
  isProcessing:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.isProcessing = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // onVerify(verifycode: HTMLInputElement) {
  //   // After retrieving the confirmation code from the user
  //   Auth.confirmSignUp(this.userName, verifycode.value, {
  //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
  //     forceAliasCreation: true    
  //     }).then(data => {
  //       console.log(data)
  //       this.toVerifyEmail = false;
  //     })
  //       .catch(err => console.log(err));
  // }

  signInToAWS() {

    this.isProcessing = true;
    console.log("in sign in component")
    this.submitted = true;
    console.log(this.loginForm.value);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("invalide")
      return;
    }

    console.log(this.loginForm.value);

    const authInfo = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    Auth.signIn(authInfo).then(user => {
      console.log(user);
      console.log(user.attributes.email);
      console.log(user.pool.clientId);

      this.authenticationService.login(user.attributes.email, user.pool.clientId);

      // this.loading = true;
      // this.authenticationService.login(user.attributes.email, user.pool.clientId)
      //   .pipe(first())
      //   .subscribe(
      //     data => {
      //       this.router.navigate([this.returnUrl]);
      //     },
      //     error => {
      //       this.alertService.error(error);
      //       this.loading = false;
      //     });
      this.isProcessing = false;
      this.router.navigate(['/home'])
    }).catch(err => console.log(err));

  }

  

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

    
  // }
}
