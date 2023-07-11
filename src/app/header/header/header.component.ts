import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string='default';
  adminName:string=''

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        // console.log(val.url);
        if(localStorage.getItem('admin') && val.url.includes('admin')){
            let adminStore:any = localStorage.getItem('admin');
            let adminStoreData:any = JSON.parse(adminStore)
            this.adminName = adminStoreData[0].name
            this.menuType = 'admin'
        }else{
          console.log('Outside admin space');
          this.menuType ='default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('admin');
    this.route.navigate(['/']);
  }

}
