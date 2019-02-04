import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  // injecting service into constructor
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {

   }

  ngOnInit() {
  }

  onRegisterSubmit(){
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please!! fill up all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    // if email is not valid
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Email is not valid', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    // register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You Registered!!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']); // re-routing
      } else {
        this.flashMessage.show('You NOT Registered!!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);   // re-routing
      }
    })


  }

}
