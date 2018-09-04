import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';

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
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) {

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
      this.flashMessage.show('Please!! fill up all the fields', { cssClass: 'alert-success', timeout: 1000 });
      return false;
    }


    // if email is not valid
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Email is not valid', { cssClass: 'alert-success', timeout: 1000 });
      return false;
    }
  }

}
