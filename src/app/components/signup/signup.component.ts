import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { valHooks } from 'jquery';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenservice: TokenService , private cookieService: CookieService) { }

  ngOnInit() {
     this.init();
  }

  init(){
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser(){
    this.showSpinner = true;
    this.authService.registerUser(this.signupForm.value).subscribe(
      data =>{
        console.log(data.token);
       this.tokenservice.SetToken(data.token);
      //this.cookieService.set('chat-token', data.token);
      this.signupForm.reset();
       setTimeout(() => {
        this.router.navigate(['streams']);
       }, 2000);
    }, err=> {
      this.showSpinner = false;
      if(err.error.msg){
        this.errorMessage = err.error.msg[0].message;
      }
      if(err.error.message){
        this.errorMessage = err.error.message;
      }
    });
  }

}
