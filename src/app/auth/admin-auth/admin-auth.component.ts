import { Component,OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { adminSignUp } from 'src/app/shared/adminDataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  constructor(private authservice:AuthserviceService, private router:Router){}

  ngOnInit(): void {
    this.authservice.reloadAdmin();
  }

  signUp(data:adminSignUp){
    console.log(data);
    this.authservice.adminSignUp(data)
    // this.authservice.adminSignUp(data).subscribe((res)=>{
    //     if(res){
    //       this.router.navigate(['admin-home'])
    //     }
    // });

  }
}
