import { Component, OnInit } from '@angular/core';
import { userLogin, userSignUp } from 'src/app/shared/userDataTypes';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false;
  loginError = '';

  constructor(private authService:AuthserviceService) { }

  ngOnInit(): void {
    this.authService.reloadUser();
  }

  signUp(data:userSignUp){
    this.authService.userSignUp(data);
  }

  login(data:userLogin){
    this.authService.userLogin(data);
    this.authService.isLoginError.subscribe((isError)=>console.log(isError));
    this.loginError="Email or password is incorrect"
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }

}
